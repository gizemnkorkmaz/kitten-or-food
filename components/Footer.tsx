"use client";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <footer className="flex justify-center items-center my-4 text-[10px] text-neutral-500 opacity-65">
      <Link href="https://github.com/gizemnkorkmaz/kitten-or-food">
        <Image src="/images/github.png" alt="Logo" width={20} height={20} />
      </Link>
    </footer>
  );
}

export default Footer;
