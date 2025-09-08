"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShareIcon from "@mui/icons-material/Share";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface CatActionsProps {
  breed: string;
  slug: string;
  phoneNumber: string;
}

export default function DogDetailAction({ breed, slug, phoneNumber }: CatActionsProps) {
  const [clicked, setClicked] = useState<{ [key: string]: boolean }>({});
  const url = `${window.location.origin}/find-your-dog/${slug}`;

  const handleFeedback = (key: string) => {
    setClicked((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => setClicked((prev) => ({ ...prev, [key]: false })), 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied!");
    handleFeedback("copy");
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in adopting ${breed}.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
    handleFeedback("whatsapp");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out ${breed}!`,
          text: `Hi, check out this dog available for adoption!`,
          url,
        });
        handleFeedback("share");
      } catch (err) {
        console.error(err);
      }
    } else {
      toast("Your browser does not support native sharing", { icon: "⚠️" });
    }
  };

  return (
    <>
      {/* Desktop / Tablet */}
      <div className="hidden md:flex flex-wrap gap-4 justify-center mt-4">
        <ActionButton
          label="WhatsApp"
          icon={<WhatsAppIcon />}
          onClick={handleWhatsApp}
          clicked={clicked.whatsapp}
          color="#25D366"
        />
        <ActionButton
          label="Share"
          icon={<ShareIcon />}
          onClick={handleShare}
          clicked={clicked.share}
          color="#748873"
        />
        <ActionButton
          label="Copy Link"
          icon={clicked.copy ? <CheckIcon /> : <ContentCopyIcon />}
          onClick={handleCopy}
          clicked={clicked.copy}
          color="#E5E0D8"
          textColor="#748873"
        />
      </div>

      {/* Mobile - sticky bottom bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-3 p-3 bg-white rounded-full shadow-lg md:hidden">
        <ActionButton icon={<WhatsAppIcon />} onClick={handleWhatsApp} small clicked={clicked.whatsapp} color="#25D366" />
        <ActionButton icon={<ShareIcon />} onClick={handleShare} small clicked={clicked.share} color="#748873" />
        <ActionButton
          icon={clicked.copy ? <CheckIcon /> : <ContentCopyIcon />}
          onClick={handleCopy}
          small
          clicked={clicked.copy}
          color="#E5E0D8"
          textColor="#748873"
        />
      </div>
    </>
  );
}

// Button Component
interface ActionButtonProps {
  label?: string;
  icon: React.ReactNode;
  onClick: () => void;
  small?: boolean;
  clicked?: boolean;
  color?: string;
  textColor?: string;
}

const ActionButton = ({ label, icon, onClick, small, clicked, color, textColor }: ActionButtonProps) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-2 font-semibold shadow-md rounded-full transform transition-all duration-300 ${
      clicked ? "scale-110" : "hover:scale-105"
    }`}
    style={{
      padding: small ? "0.5rem 0.75rem" : "0.75rem 1.5rem",
      minWidth: small ? "44px" : "auto",
      minHeight: small ? "44px" : "auto",
      fontSize: small ? "1.25rem" : "1rem",
      backgroundColor: clicked ? "#22c55e" : color,
      color: clicked ? "#fff" : textColor ?? "#fff",
    }}
  >
    {icon}
    {label && !small && <span>{label}</span>}
  </button>
);
