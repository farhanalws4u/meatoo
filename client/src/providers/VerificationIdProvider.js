import React, { createContext, useState } from "react";

export const verificationIdContext = createContext();

const VerificationIdProvider = ({ children }) => {
  const [verificationId, setVerificationId] = useState("");

  return (
    <verificationIdContext.Provider
      value={{ verificationId, setVerificationId }}
    >
      {children}
    </verificationIdContext.Provider>
  );
};

export default VerificationIdProvider;
