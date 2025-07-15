"use client";
import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { ContentCopy, Download, Share } from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

type GuestQRCodeProps = {
  qrLink: string;
  guestName?: string;
};

export default function GuestQRCode({ qrLink, guestName }: GuestQRCodeProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const [qrSize, setQrSize] = React.useState(500);

  // Responsive QR size
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 1024) {
        setQrSize(350); // tablet size
      } else {
        setQrSize(500); // desktop size
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling({
        width: qrSize,
        height: qrSize,
        image: "/ourLogo-no-leaf.svg",
        dotsOptions: {
          color: "#ecb5bc",
          type: "dots",
        },
        cornersDotOptions: {
          color: "#387e80",
          type: "dot",
        },
        cornersSquareOptions: {
          color: "#387e80",
          type: "extra-rounded",
        },
        backgroundOptions: {
          color: "#fff",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 0,
          imageSize: 0.4,
        },
      });
    } else {
      qrCodeRef.current.update({ width: qrSize, height: qrSize });
    }
    const qrCode = qrCodeRef.current;

    if (qrRef.current && qrCode) {
      qrRef.current.innerHTML = "";
      qrCode.append(qrRef.current);
      qrCode.update({ data: qrLink });
    }
  }, [qrLink, qrSize]);

  // Helper to draw name above QR code on a new canvas
  const drawNameAboveQRCode = async (canvas: HTMLCanvasElement, name: string) => {
    // Create a new canvas with extra height for the name
    const nameHeight = 60;
    const newCanvas = document.createElement("canvas");
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height + nameHeight;
    const ctx = newCanvas.getContext("2d");
    if (!ctx) return null;

    // Fill background white
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);

    // Draw name at the top
    ctx.font = "bold 28px Arial";
    ctx.fillStyle = "#387e80";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(name, newCanvas.width / 2, 16);

    // Draw QR code below the name
    ctx.drawImage(canvas, 0, nameHeight);

    return newCanvas;
  };

  // Helper to generate a 500x500 QR code for download/share
  const generateDownloadCanvas = async () => {
    const tempQR = new QRCodeStyling({
      width: 500,
      height: 500,
      image: "/ourLogo-no-leaf.svg",
      dotsOptions: {
        color: "#ecb5bc",
        type: "dots",
      },
      cornersDotOptions: {
        color: "#387e80",
        type: "dot",
      },
      cornersSquareOptions: {
        color: "#387e80",
        type: "extra-rounded",
      },
      backgroundOptions: {
        color: "#fff",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 0,
        imageSize: 0.4,
      },
    });
    const tempDiv = document.createElement("div");
    document.body.appendChild(tempDiv);
    await tempQR.update({ data: qrLink });
    tempQR.append(tempDiv);
    // Wait for the canvas to be rendered using MutationObserver with timeout fallback
    const canvas = await new Promise<HTMLCanvasElement | null>((resolve) => {
      let resolved = false;
      const observer = new MutationObserver(() => {
        const c = tempDiv.querySelector("canvas");
        if (c) {
          observer.disconnect();
          resolved = true;
          // Add a short delay to ensure QR code is fully rendered
          setTimeout(() => resolve(c as HTMLCanvasElement), 200);
        }
      });
      observer.observe(tempDiv, { childList: true, subtree: true });
      // Fallback: if canvas is already there
      const c = tempDiv.querySelector("canvas");
      if (c) {
        observer.disconnect();
        resolved = true;
        setTimeout(() => resolve(c as HTMLCanvasElement), 200);
      }
      // Timeout fallback (in case MutationObserver fails)
      setTimeout(() => {
        if (!resolved) {
          observer.disconnect();
          resolve(tempDiv.querySelector("canvas") as HTMLCanvasElement | null);
        }
      }, 1200);
    });
    let finalCanvas = canvas;
    if (canvas && guestName) {
      finalCanvas = await drawNameAboveQRCode(canvas, guestName);
    }
    document.body.removeChild(tempDiv);
    return finalCanvas;
  };

  const downloadQRCode = async (e: React.MouseEvent) => {
    e.preventDefault();
    const finalCanvas = await generateDownloadCanvas();
    if (finalCanvas) {
      const link = document.createElement("a");
      link.download = guestName ? `${guestName}-qr-invite.png` : "qr-invite.png";
      link.href = finalCanvas.toDataURL("image/png");
      link.click();
      return;
    }
    // fallback to default
    if (qrCodeRef.current) {
      qrCodeRef.current.download({
        name: guestName ? `${guestName}-qr-invite` : "qr-invite",
        extension: "png",
      });
    }
  };

  const copyQRCode = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(qrLink);
  };
  const dataURLToFile = (dataUrl: string, filename: string) => {
    const arr = dataUrl.split(",");
    const mime =
      arr
        .at(0)
        ?.match(/:(.*?);/)
        ?.at(1) || "";
    if (!mime) {
      throw new Error("Invalid data URL: No MIME type found");
    }
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };
  const handleShare = async () => {
    const finalCanvas = await generateDownloadCanvas();
    if (!finalCanvas) return;
    const dataUrl = finalCanvas.toDataURL("image/jpeg");
    const file = dataURLToFile(dataUrl, "invite.jpg");
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "You're Invited!",
          text: `We're getting married! 💍 RSVP here: ${qrLink}`,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      alert("This browser does not support image sharing.");
    }
  };
  return (
    <div className="flex flex-col items-center">
      {guestName && <div className="mb-2 text-xl font-semibold text-center text-[#387e80]">{guestName}</div>}
      <div className="m-8" ref={qrRef} />
      <div className="flex flex-row gap-2 pt-5 items-center">
        <Download onClick={downloadQRCode} className="hover:text-primary hover:cursor-pointer" />
        <ContentCopy onClick={copyQRCode} className="hover:text-primary hover:cursor-pointer" />
        <Share onClick={handleShare} className="hover:text-primary hover:cursor-pointer" />
      </div>
    </div>
  );
}
