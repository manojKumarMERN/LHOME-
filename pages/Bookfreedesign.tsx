import React from 'react';
import '../styles/bookfreedesign.module.scss'
import PageHeader from "./components/PageHeader";
import * as config from "./../next.config.js";
interface homeproperties {
    screenwidth: number;
    screenheight: number;
 
 }
const Bookfreedesign: React.FC<homeproperties> = ({ screenwidth, screenheight }) => {
    let assetpath = config.assetPrefix ? `${config.assetPrefix}` : ``;
    const living = React.useRef(null);
 
    const page = React.useRef(null);
    const [prevPosition, setPrev] = React.useState(0);
    const [hidden, setHidden] = React.useState(false)
 
    const pageheaderMonitor = () => {
       if (page.current.scrollTop > prevPosition) {
          setPrev(page.current.scrollTop)
          setHidden(true)
       } else {
          setHidden(false)
          setPrev(page.current.scrollTop)
 
       }
    }
 
return(
    <>
    <div>
    <PageHeader screenwidth={screenwidth} screenheight={screenheight} assetpath={assetpath} hidden={false} />

    </div>
    </>
)
}
export default Bookfreedesign;