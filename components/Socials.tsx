import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { AiOutlineSpotify } from "react-icons/ai";

const Socials = () => {
  const style = "link-quiet size-5 sm:size-6";

  return (
    <>
      <a
        href="https://www.linkedin.com/in/henryvendittelli/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Henry's LinkedIn Profile"
      >
        <FaLinkedin className={style} />
      </a>
      <a
        href="https://github.com/hvenry"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Henry's GitHub Profile"
      >
        <FaGithubSquare className={style} />
      </a>
      <a
        href="https://www.facebook.com/hvenry"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Henry's Facebook Profile"
      >
        <FaFacebookSquare className={style} />
      </a>
      <a
        href="https://leetcode.com/u/hvenry/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Henry's LeetCode Profile"
      >
        <SiLeetcode className={style} />
      </a>
      <a
        href="https://open.spotify.com/user/ogprinsta?si=b4845668d4f04833"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Henry's Spotify Profile"
      >
        <AiOutlineSpotify className={style} />
      </a>
    </>
  );
};

export default Socials;
