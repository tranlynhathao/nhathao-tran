import React from 'react';

const ResumeButton = ({ showIframe }: { showIframe: boolean }) => {
    if (!showIframe) {
        return null; // Display nothing when showIframe is false
    }

    return (
        <div className="text-center" style={{ paddingTop: '100px' }}>  {}
            <iframe 
                src="/TranLyNhatHao_SWEResume_2024.pdf" 
                width="80%"
                height="700px" 
                style={{ 
                    border: '2px solid black', 
                    borderRadius: '10px',
                    margin: '0 auto',
                    display: 'block'
                }}  
            />
        </div>
    );
}

export default ResumeButton;
