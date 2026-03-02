import React, { useEffect } from 'react';

const NpfWidget = () => {
  useEffect(() => {
    // Inject the script
    const script = document.createElement('script');
    script.src = 'https://widgets.nopaperforms.com/emwgts.js';
    script.async = true;
    document.body.appendChild(script);

    // Auto-check checkbox logic
    const checkInterval = setInterval(function () {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      if (checkboxes.length > 0) {
        checkboxes.forEach(function (checkbox) {
          const parentText = checkbox.parentElement ? checkbox.parentElement.textContent || '' : '';
          const nextSiblingText = checkbox.nextSibling ? checkbox.nextSibling.textContent || '' : '';

          if (
            parentText.includes('I agree to receive information') ||
            nextSiblingText.includes('I agree to receive information') ||
            parentText.includes('agree to receive') ||
            nextSiblingText.includes('agree to receive')
          ) {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            checkbox.dispatchEvent(new Event('click', { bubbles: true }));
          }
        });
        clearInterval(checkInterval);
      }
    }, 100);

    return () => {
      clearInterval(checkInterval);
    };
  }, []);

  return (
    <div 
      id="npf-widget-container" 
      style={{ 
        minHeight: '400px', 
        width: '100%',
        position: 'relative',
        backgroundColor: '#A21D2E',
        borderRadius: '1.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        padding: '20px',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      <div className="npf_wgts" data-height="400px" data-w="1242a8cbbc551970993f589ee9febba6"></div>
    </div>
  );
};

export default NpfWidget;
