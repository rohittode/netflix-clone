import ReactPlayer from "react-player"
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { ThumbUpIcon, XIcon } from "@heroicons/react/solid";
import {
  CheckIcon,
  PlusIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from "@heroicons/react/outline";
function Play() {
  const [muted, setMuted] = useState(false);
  return (
   
    <div className="relative pt-[56.25%]">
          <ReactPlayer
          url={"https://youtu.be/RwEH3d89cU0"}
            controls
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
        </div>
  )
}

export default Play