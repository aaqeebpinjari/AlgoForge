import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Contributors from "../components/Contributors";

const ContributorProfileModal = () => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const event = new CustomEvent("openContributorModal", { detail: id });
      window.dispatchEvent(event);
    }
  }, [id]);

  return <Contributors />;
};

export default ContributorProfileModal;
