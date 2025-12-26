import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function useMobileMapClick(mapRef) {
  const navigate = useNavigate();
  const clickTimer = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    const handleTouchStart = (e) => {
      // Store touch start time
      clickTimer.current = setTimeout(() => {
        // This is a long press - maybe show context menu
      }, 500);
    };

    const handleTouchEnd = (e) => {
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
        clickTimer.current = null;
      }

      // If it was a short tap, treat it as a click
      if (e.originalEvent.touches.length === 0) {
        const latlng = e.latlng || map.getCenter();
        navigate(`form?lat=${latlng.lat}&lng=${latlng.lng}`);
      }
    };

    const handleClick = (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    };

    map.on("click", handleClick);
    map.on("touchstart", handleTouchStart);
    map.on("touchend", handleTouchEnd);

    return () => {
      map.off("click", handleClick);
      map.off("touchstart", handleTouchStart);
      map.off("touchend", handleTouchEnd);
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }
    };
  }, [mapRef, navigate]);
}
