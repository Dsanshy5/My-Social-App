import React from 'react';

function Loader() {
  return (
    <div style={styles.loaderOverlay}>
      <svg width="80" height="80" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" fill="#5A67D8">
          <circle cx="15" cy="60" r="15">
              <animate attributeName="r" from="15" to="15"
                       begin="0s" dur="0.8s"
                       values="15;9;15" calcMode="linear"
                       repeatCount="indefinite" />
              <animate attributeName="fill-opacity" from="1" to="1"
                       begin="0s" dur="0.8s"
                       values="1;.5;1" calcMode="linear"
                       repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="60" r="9" fillOpacity="0.3">
              <animate attributeName="r" from="9" to="9"
                       begin="0s" dur="0.8s"
                       values="9;15;9" calcMode="linear"
                       repeatCount="indefinite" />
              <animate attributeName="fill-opacity" from="0.5" to="0.5"
                       begin="0s" dur="0.8s"
                       values=".5;1;.5" calcMode="linear"
                       repeatCount="indefinite" />
          </circle>
          <circle cx="105" cy="60" r="15">
              <animate attributeName="r" from="15" to="15"
                       begin="0s" dur="0.8s"
                       values="15;9;15" calcMode="linear"
                       repeatCount="indefinite" />
              <animate attributeName="fill-opacity" from="1" to="1"
                       begin="0s" dur="0.8s"
                       values="1;.5;1" calcMode="linear"
                       repeatCount="indefinite" />
          </circle>
      </svg>
    </div>
  );
}

const styles = {
  loaderOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
};

export default Loader;