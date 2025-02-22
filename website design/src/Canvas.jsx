import React, { useEffect, useState } from 'react'
import images from './images';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';

function Canvas({ details }) {
    const { startIndex, numImages, duration, size, top, left, zIndex } = details;
    const [index, setIndex] = useState({
        value: startIndex
    })
    const canvaRef = React.useRef(null)

    useGSAP(() => {
        gsap.to(index, {
            value: startIndex + numImages - 1,
            duration: duration,
            repeat: -1,
            ease: "linear",
            onUpdate: () => {
                setIndex({ value: Math.round(index.value) })
            }
        })
        gsap.from(canvaRef.current, {
            opacity: 0,
            scale: 0.8,
            ease: "power2.inOut"
        })
    })

    useEffect(() => {
        const scale = window.devicePixelRatio;
        const canvas = canvaRef.current
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.src = images[index.value]
        img.onload = () => {
            // canvas.width = img.width
            // canvas.height = img.height
            // ctx.drawImage(img, 0, 0)
            canvas.width = canvas.offsetWidth * scale;
            canvas.height = canvas.offsetHeight * scale;
            canvas.style.width = canvas.offsetWidth + "px";
            canvas.style.height = canvas.offsetHeight + "px";
            ctx.scale(scale, scale)
            ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);

        }
    }, [index])

    return (
        <canvas
            data-scroll
            data-scroll-speed={Math.random().toFixed(1)}
            ref={canvaRef}
            style={{
                width: `${size * 2}px`,
                height: `${size * 1.8}px`,
                top: `${top}%`,
                left: `${left}%`,
                zIndex: `${zIndex}`,
            }}
            id="canvas">
        </canvas>
    )
}

export default Canvas