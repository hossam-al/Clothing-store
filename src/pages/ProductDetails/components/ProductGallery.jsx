import MuiButton from "@mui/material/Button";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaMinus, FaPlus, FaSearchPlus, FaTimes } from "react-icons/fa";
import { FaRotateLeft } from "react-icons/fa6";
import styles from "../ProductDetailsPage.module.css";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.25;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getTouchDistance(touches) {
  const [firstTouch, secondTouch] = touches;
  const x = secondTouch.clientX - firstTouch.clientX;
  const y = secondTouch.clientY - firstTouch.clientY;

  return Math.hypot(x, y);
}

function ProductGallery({ activeImage, images, productName, setActiveImage }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [scale, setScale] = useState(MIN_SCALE);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const imageWrapperRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const positionStartRef = useRef({ x: 0, y: 0 });
  const lastTouchDistanceRef = useRef(null);
  const lastTapTimeRef = useRef(0);

  const getBoundedPosition = (nextPosition, nextScale = scale) => {
    const wrapper = imageWrapperRef.current;

    if (!wrapper || nextScale <= MIN_SCALE) {
      return { x: 0, y: 0 };
    }

    const { width, height } = wrapper.getBoundingClientRect();
    const maxX = (width * (nextScale - 1)) / 2;
    const maxY = (height * (nextScale - 1)) / 2;

    return {
      x: clamp(nextPosition.x, -maxX, maxX),
      y: clamp(nextPosition.y, -maxY, maxY),
    };
  };

  const resetZoom = () => {
    setScale(MIN_SCALE);
    setPosition({ x: 0, y: 0 });
    setIsDragging(false);
    lastTouchDistanceRef.current = null;
  };

  const updateScale = (nextScale) => {
    const boundedScale = clamp(nextScale, MIN_SCALE, MAX_SCALE);

    setScale(boundedScale);
    setPosition((current) => getBoundedPosition(current, boundedScale));
  };

  const handleZoomIn = () => updateScale(scale + ZOOM_STEP);
  const handleZoomOut = () => updateScale(scale - ZOOM_STEP);

  const handleClosePreview = () => {
    resetZoom();
    setIsPreviewOpen(false);
  };

  const handleOpenPreview = () => {
    resetZoom();
    setIsPreviewOpen(true);
  };

  const handlePreviewImageChange = (image) => {
    resetZoom();
    setActiveImage(image);
  };

  const handleWheelZoom = (event) => {
    event.preventDefault();
    const direction = event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
    updateScale(scale + direction);
  };

  const handleMouseDown = (event) => {
    if (scale <= MIN_SCALE) {
      return;
    }

    setIsDragging(true);
    dragStartRef.current = { x: event.clientX, y: event.clientY };
    positionStartRef.current = position;
  };

  const handleMouseMove = (event) => {
    if (!isDragging || scale <= MIN_SCALE) {
      return;
    }

    const nextPosition = {
      x: positionStartRef.current.x + event.clientX - dragStartRef.current.x,
      y: positionStartRef.current.y + event.clientY - dragStartRef.current.y,
    };

    setPosition(getBoundedPosition(nextPosition));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    lastTouchDistanceRef.current = null;
  };

  const handleDoubleClick = () => {
    if (scale > MIN_SCALE) {
      resetZoom();
      return;
    }

    updateScale(2);
  };

  const handleTouchStart = (event) => {
    if (event.touches.length === 2) {
      lastTouchDistanceRef.current = getTouchDistance(event.touches);
      return;
    }

    const now = event.timeStamp;

    if (now - lastTapTimeRef.current < 280) {
      handleDoubleClick();
      lastTapTimeRef.current = 0;
      return;
    }

    lastTapTimeRef.current = now;

    if (event.touches.length === 1 && scale > MIN_SCALE) {
      const touch = event.touches[0];
      setIsDragging(true);
      dragStartRef.current = { x: touch.clientX, y: touch.clientY };
      positionStartRef.current = position;
    }
  };

  const handleTouchMove = (event) => {
    event.preventDefault();

    if (event.touches.length === 2) {
      const nextDistance = getTouchDistance(event.touches);
      const lastDistance = lastTouchDistanceRef.current || nextDistance;
      const distanceDelta = nextDistance - lastDistance;

      updateScale(scale + (distanceDelta > 0 ? ZOOM_STEP : -ZOOM_STEP));
      lastTouchDistanceRef.current = nextDistance;
      return;
    }

    if (event.touches.length === 1 && isDragging && scale > MIN_SCALE) {
      const touch = event.touches[0];
      const nextPosition = {
        x: positionStartRef.current.x + touch.clientX - dragStartRef.current.x,
        y: positionStartRef.current.y + touch.clientY - dragStartRef.current.y,
      };

      setPosition(getBoundedPosition(nextPosition));
    }
  };

  const previewModal = (
    <div aria-modal="true" className={styles.previewModal} role="dialog">
      <div className={styles.previewControls}>
        <MuiButton
          aria-label="Zoom out"
          className={styles.controlButton}
          disabled={scale <= MIN_SCALE}
          onClick={handleZoomOut}
          type="button"
        >
          <FaMinus />
        </MuiButton>
        <MuiButton
          aria-label="Reset zoom"
          className={styles.controlButton}
          onClick={resetZoom}
          type="button"
        >
          <FaRotateLeft />
        </MuiButton>
        <MuiButton
          aria-label="Zoom in"
          className={styles.controlButton}
          disabled={scale >= MAX_SCALE}
          onClick={handleZoomIn}
          type="button"
        >
          <FaPlus />
        </MuiButton>
        <MuiButton
          aria-label="Close product preview"
          className={styles.closePreview}
          onClick={handleClosePreview}
          type="button"
        >
          <FaTimes />
        </MuiButton>
      </div>
      <div className={styles.previewDialog}>
        <div
          className={`${styles.previewImage} ${
            scale > MIN_SCALE ? styles.previewImageZoomed : ""
          } ${isDragging ? styles.previewImageDragging : ""}`}
          onDoubleClick={handleDoubleClick}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleDragEnd}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onTouchEnd={handleDragEnd}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          onWheel={handleWheelZoom}
          ref={imageWrapperRef}
        >
          <img
            alt={productName}
            draggable="false"
            src={activeImage}
            style={{
              transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
            }}
          />
        </div>
        <div className={styles.previewThumbs}>
          {images.map((image) => (
            <MuiButton
              className={activeImage === image ? styles.activeThumb : ""}
              key={image}
              onClick={() => handlePreviewImageChange(image)}
              type="button"
            >
              <img alt={productName} src={image} />
            </MuiButton>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className={styles.galleryCard}>
      <div className={styles.mainImageWrap}>
        <MuiButton
          aria-label="Open product preview"
          className={styles.previewButton}
          onClick={handleOpenPreview}
          sx={{
            backgroundColor: "rgba(17, 17, 17, 0.82)",
            borderRadius: "999px",
            color: "#ffffff",
            height: "2.75rem",
            minWidth: 0,
            padding: 0,
            position: "absolute",
            right: "1rem",
            top: "1rem",
            width: "2.75rem",
            zIndex: 3,
            "&:hover": {
              backgroundColor: "var(--color-highlight-orange)",
            },
            "@media (max-width: 575px)": {
              height: "2.45rem",
              right: "1rem",
              top: "0.85rem",
              width: "2.45rem",
            },
          }}
          type="button"
        >
          <FaSearchPlus />
        </MuiButton>
        <div className={styles.mainImage}>
          {activeImage && <img alt={productName} src={activeImage} />}
        </div>
      </div>

      <div className={styles.thumbs} role="list">
        {images.map((image) => (
          <MuiButton
            aria-label={`Preview ${productName}`}
            className={activeImage === image ? styles.activeThumb : ""}
            key={image}
            onClick={() => setActiveImage(image)}
            type="button"
          >
            <img alt={productName} src={image} />
          </MuiButton>
        ))}
      </div>

      {isPreviewOpen && createPortal(previewModal, document.body)}
    </section>
  );
}

export default ProductGallery;
