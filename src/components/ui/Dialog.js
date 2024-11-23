// src/components/ui/Dialog.js
import React from 'react';

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div style={styles.overlay} onClick={() => onOpenChange(false)}>
      <div style={styles.dialog} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children, className }) => (
  <div className={className} style={styles.content}>
    {children}
  </div>
);

export const DialogHeader = ({ children }) => (
  <div style={styles.header}>{children}</div>
);

export const DialogTitle = ({ children, className }) => (
  <h2 className={className} style={styles.title}>
    {children}
  </h2>
);

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  dialog: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '600px',
    width: '90%',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  content: {
    marginTop: '10px',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    margin: 0,
    fontSize: '24px',
  },
};
