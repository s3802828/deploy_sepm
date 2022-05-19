import { useState } from "react";

export default function ScrollButton() {
    const [visible, setVisible] = useState(false)
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
          setVisible(true)
        } 
        else if (scrolled <= 300){
          setVisible(false)
        }
      };
      
      window.addEventListener('scroll', toggleVisible);
    return(
        <div style={{width: "100%", display: visible ? 'inline' : 'none'}}>
            <a href='#'><button className="btn rounded-circle btn-warning btn-lg" style={{position: "fixed", 
        right: "5%",
        bottom: "5%",
        zIndex: 1}}><i class="bi bi-chevron-bar-up"></i></button></a>
        </div>
    )
}