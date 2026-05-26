'use client';

import {
  useRef,
  useState,
} from 'react';

import Peer from 'peerjs';

import io from 'socket.io-client';

import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  ArrowLeft,
} from 'lucide-react';

import { useRouter }
from 'next/navigation';

const socket = io(
  process.env.NEXT_PUBLIC_API_URL!
);

export default function MeetingPage() {

  const myVideo =
    useRef<HTMLVideoElement>(null);

  const userVideo =
    useRef<HTMLVideoElement>(null);

  const peerRef =
    useRef<any>(null);

  const streamRef =
    useRef<any>(null);

  const [roomId, setRoomId] =
    useState('');

  const [joined, setJoined] =
    useState(false);

  const [micOn, setMicOn] =
    useState(true);

  const [cameraOn, setCameraOn] =
    useState(true);

  const [emoji, setEmoji] =
    useState('');

  const router = useRouter();

  // JOIN MEETING

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

        call.on(
          'stream',
          (remoteStream) => {

            if (userVideo.current) {

              userVideo.current.srcObject =
                remoteStream;

            }

          }
        );
      }
    );

    peer.on('call', (call) => {

      call.answer(stream);

      call.on(
        'stream',
        (remoteStream) => {

          if (userVideo.current) {

            userVideo.current.srcObject =
              remoteStream;

          }

        }
      );
    });

    peerRef.current = peer;

    setJoined(true);
  };

  // TOGGLE MIC

  const toggleMic = () => {

    const audioTrack =
      streamRef.current
        ?.getAudioTracks()[0];

    if (audioTrack) {

      audioTrack.enabled =
        !audioTrack.enabled;

      setMicOn(audioTrack.enabled);

    }
  };

  // TOGGLE CAMERA

  const toggleCamera = () => {

    const videoTrack =
      streamRef.current
        ?.getVideoTracks()[0];

    if (videoTrack) {

      videoTrack.enabled =
        !videoTrack.enabled;

      setCameraOn(videoTrack.enabled);

    }
  };

  // END CALL

  const endCall = () => {

    streamRef.current
      ?.getTracks()
      .forEach((track: any) =>
        track.stop()
      );

    router.push('/dashboard');
  };

  return (

    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-500 opacity-20 rounded-full blur-3xl" />

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-500 opacity-20 rounded-full blur-3xl" />

      {/* MAIN */}

      <div className="relative z-10 p-10">

        {/* TOP BAR */}

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">

              ERP Live Meeting

            </h1>

            <p className="text-slate-400 mt-3">

              Real-time enterprise collaboration

            </p>

          </div>

          <button
            onClick={() =>
              router.push('/dashboard')
            }
            className="
              bg-white/10
              backdrop-blur-xl
              border border-white/10
              p-4
              rounded-2xl
              hover:bg-white/20
              transition
            "
          >

            <ArrowLeft />

          </button>

        </div>

        {/* JOIN CARD */}

        {!joined && (

          <div className="max-w-xl bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 mb-10">

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

          <div className="bg-black/40 border border-white/10 rounded-3xl overflow-hidden">

            <div className="p-5 border-b border-white/10">

              Your Camera

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

          {/* REMOTE VIDEO */}

          <div className="bg-black/40 border border-white/10 rounded-3xl overflow-hidden">

            <div className="p-5 border-b border-white/10">

              Team Member

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

        {/* EMOJI BAR */}

        <div className="flex justify-center gap-5 mt-10">

          {['🔥', '👏', '😂', '👍', '🎉', '❤️'].map(
            (item) => (

              <button
                key={item}
                onClick={() =>
                  setEmoji(item)
                }
                className="
                  text-4xl
                  hover:scale-125
                  transition
                "
              >

                {item}

              </button>

            )
          )}

        </div>

        {/* CONTROLS */}

        <div className="flex justify-center gap-6 mt-10">

          {/* MIC */}

          <button
            onClick={toggleMic}
            className={`
              p-5
              rounded-full
              transition
              ${
                micOn
                  ? 'bg-white/10'
                  : 'bg-red-500'
              }
            `}
          >

            {micOn
              ? <Mic />
              : <MicOff />}

          </button>

          {/* CAMERA */}

          <button
            onClick={toggleCamera}
            className={`
              p-5
              rounded-full
              transition
              ${
                cameraOn
                  ? 'bg-white/10'
                  : 'bg-red-500'
              }
            `}
          >

            {cameraOn
              ? <Video />
              : <VideoOff />}

          </button>

          {/* END */}

          <button
            onClick={endCall}
            className="
              p-5
              rounded-full
              bg-red-500
              hover:bg-red-600
              transition
            "
          >

            <PhoneOff />

          </button>

        </div>

      </div>

      {/* FLOATING EMOJI */}

      {emoji && (

        <div
          className="
            fixed
            top-24
            right-10
            text-7xl
            animate-bounce
            z-50
          "
        >

          {emoji}

        </div>

      )}

    </div>
  );
}