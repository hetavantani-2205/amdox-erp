'use client';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import Peer from 'peerjs';

import io from 'socket.io-client';

const socket = io(
  process.env.NEXT_PUBLIC_API_URL
);

export default function MeetingPage() {

  const myVideo =
    useRef<HTMLVideoElement>(null);

  const userVideo =
    useRef<HTMLVideoElement>(null);

  const [roomId, setRoomId] =
    useState('');

  const [joined, setJoined] =
    useState(false);

 const peerRef = useRef<any>(null);

const streamRef = useRef<any>(null);

  const joinMeeting = async () => {

    const stream =
      await navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        });

    streamRef.current = stream;

    if (myVideo.current) {

      myVideo.current.srcObject = stream;

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

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">

        Live ERP Meeting

      </h1>

      {!joined && (

        <div className="flex gap-4 mb-10">

          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) =>
              setRoomId(e.target.value)
            }
            className="
              p-4
              rounded-xl
              text-black
              w-[300px]
            "
          />

          <button
            onClick={joinMeeting}
            className="
              bg-blue-600
              px-8
              rounded-xl
            "
          >
            Join Meeting
          </button>

        </div>
      )}

      <div className="grid grid-cols-2 gap-6">

        <video
          ref={myVideo}
          autoPlay
          muted
          className="
            rounded-3xl
            bg-black
            w-full
            h-[400px]
            object-cover
          "
        />

        <video
          ref={userVideo}
          autoPlay
          className="
            rounded-3xl
            bg-black
            w-full
            h-[400px]
            object-cover
          "
        />

      </div>

    </div>
  );
}