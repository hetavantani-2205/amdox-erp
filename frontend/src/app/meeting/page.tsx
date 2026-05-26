'use client';

import {
  useRef,
  useState,
} from 'react';

import Peer from 'peerjs';

import io from 'socket.io-client';

const socket = io(
  process.env.NEXT_PUBLIC_API_URL!
);

export default function MeetingPage() {

  const myVideo =
    useRef<HTMLVideoElement>(null);

  const userVideo =
    useRef<HTMLVideoElement>(null);

  const peerRef = useRef<any>(null);

  const streamRef = useRef<any>(null);

  const [roomId, setRoomId] =
    useState('');

  const [joined, setJoined] =
    useState(false);

  const joinMeeting = async () => {

    const stream =
      await navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        });

    streamRef.current = stream;

    if (myVideo.current) {

      myVideo.current.srcObject =
        stream;

    }

    const peer = new Peer();

    peer.on('open', (id) => {

      socket.emit(
        'join-room',
        roomId,
        id
      );

    });

    socket.on(
      'user-connected',
      (userId: string) => {

        const call =
          peer.call(userId, stream);

        call.on('stream', (remoteStream) => {

          if (userVideo.current) {

            userVideo.current.srcObject =
              remoteStream;

          }

        });
      }
    );

    peer.on('call', (call) => {

      call.answer(stream);

      call.on('stream', (remoteStream) => {

        if (userVideo.current) {

          userVideo.current.srcObject =
            remoteStream;

        }

      });
    });

    peerRef.current = peer;

    setJoined(true);
  };

  return (

    <div className="min-h-screen bg-[#050816] overflow-hidden relative text-white">

      {/* BACKGROUND EFFECTS */}

      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-500 opacity-20 rounded-full blur-3xl" />

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-500 opacity-20 rounded-full blur-3xl" />

      {/* MAIN */}

      <div className="relative z-10 p-10">

        {/* TOP BAR */}

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">

              ERP Live Meeting

            </h1>

            <p className="text-slate-400 mt-3 text-lg">

              Real-time enterprise collaboration

            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl">

            <p className="text-sm text-slate-300">
              Status
            </p>

            <h2 className="text-green-400 font-bold">
              Live
            </h2>

          </div>

        </div>

        {/* JOIN CARD */}

        {!joined && (

          <div className="max-w-xl bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 mb-10 shadow-2xl">

            <h2 className="text-3xl font-bold mb-6">

              Join Meeting Room

            </h2>

            <div className="flex gap-4">

              <input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) =>
                  setRoomId(e.target.value)
                }
                className="
                  flex-1
                  bg-black/20
                  border border-white/10
                  p-4
                  rounded-2xl
                  outline-none
                  text-white
                  placeholder:text-slate-400
                "
              />

              <button
                onClick={joinMeeting}
                className="
                  px-8
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-500
                  to-cyan-400
                  hover:scale-105
                  transition
                  font-semibold
                  shadow-xl
                "
              >

                Join

              </button>

            </div>

          </div>

        )}

        {/* VIDEO GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* MY VIDEO */}

          <div className="relative group">

            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition" />

            <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

              <div className="flex justify-between items-center p-5 border-b border-white/10">

                <h2 className="font-semibold text-lg">

                  Your Camera

                </h2>

                <div className="flex items-center gap-2">

                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

                  Live

                </div>

              </div>

              <video
                ref={myVideo}
                autoPlay
                muted
                className="
                  w-full
                  h-[500px]
                  object-cover
                  bg-black
                "
              />

            </div>

          </div>

          {/* REMOTE VIDEO */}

          <div className="relative group">

            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition" />

            <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

              <div className="flex justify-between items-center p-5 border-b border-white/10">

                <h2 className="font-semibold text-lg">

                  Team Member

                </h2>

                <div className="flex items-center gap-2">

                  <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />

                  Connected

                </div>

              </div>

              <video
                ref={userVideo}
                autoPlay
                className="
                  w-full
                  h-[500px]
                  object-cover
                  bg-black
                "
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}