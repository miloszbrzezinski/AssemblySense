"use client";

import { useEffect, useState } from "react";
import { AddComponentModal } from "../modals/add-component-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AddComponentModal />
    </>
  );
};
