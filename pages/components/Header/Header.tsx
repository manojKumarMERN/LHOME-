import { useRouter } from 'next/router';
import * as React from "react";
import css from './Header.module.scss';
import * as Router from "react-router-dom";
import DropDownMenu from '../DropDownMenu';
import CitiesDropDownMenu from '../CitiesDropDown';
import { simpleCallInitAPI } from '../../../services/ApicallInit';
import { CiMenuFries } from "react-icons/ci";
// import { HiMenu } from "react-icons/hi";

interface pageheaderproperties {
  screenwidth: number;
  screenheight: number;
  assetpath: string;
}
let menuoptions: any = [];
let smallmenuoptions: any = [];
let menuoptionsstringed: string = "";
let smallmenuoptionsstringed: string = "";
let cities: string[] = [];
let menuGaps = [];
let smallmenuGaps = []
const Header: React.FC<pageheaderproperties> = ({ screenwidth, screenheight, assetpath }) => {
  // const navigate = Router.useNavigate();
  const [height, setHeight] = React.useState(screenheight);
  const [width, setWidth] = React.useState(screenwidth);
  const [updatemenu, setUpdateMenu] = React.useState(0);
  const [updatesmallmenu, setUpdateSmallMenu] = React.useState(0);
  const menuOptions = ["Home", "Design Gallery", "Modular Kitchen", "Wardrobe", "Bedroom", "Living Room", "Bath Room", "Space Saving Furniture", "Home Office", "Others"];
  const smallMenuOptions = ["Partner With LHome", "Refer and Earn", "Join Us", "Citiea", "Visit Us", "Customer Support"];
  const smallmenuOptions = ['']
  const [menuoptionsstring, setMenuOptionsString] = React.useState("");
  const [smallmenuoptionsstring, setSmallMenuOptionsString] = React.useState("");
  const [citiesdropdown, setCitiesDropDown] = React.useState(false);
  const logo = React.useRef(null);

  React.useEffect(() => {
    function getsettings() {
      let api = simpleCallInitAPI(`${assetpath}/assets/settings.json`);
      api.then((data: any) => {
        menuoptions = data.data.settings.menuoptions
        smallmenuoptions = data.data.settings.smallmenuoptions;
        cities = data.data.settings.cities;
        menuGaps = data.data.settings.menuGaps;
        smallmenuGaps = data.data.settings.smallmenuGaps;
        let totalwidth = 0;
        if (screenwidth < 500) {
          totalwidth = screenwidth - (document.querySelector("#logo") as HTMLDivElement).offsetWidth - 135;
        } else {
          totalwidth = screenwidth - (document.querySelector("#logo") as HTMLDivElement).offsetWidth - 350;
        }
        let residuewidth = 0;
        let newoptions = [];
        menuoptions.forEach((option: any, index: number) => {
          if (residuewidth + Number(menuGaps[index]) > totalwidth) {
            newoptions.push(option);
          } else {
          }
          residuewidth += Number(menuGaps[index]);
        });
        menuoptions = newoptions;
        menuoptionsstringed = menuoptions.join(",") + ',';
        setMenuOptionsString(menuoptionsstringed);
        setUpdateMenu(Math.random())
        totalwidth = screenwidth - (screenwidth * .6) - 100;
        residuewidth = 0;
        newoptions = [];
        smallmenuoptions.forEach((option: any, index: number) => {
          if (residuewidth + Number(smallmenuGaps[index]) > totalwidth) {
            newoptions.push(option);
          } else {
          }
          residuewidth += Number(smallmenuGaps[index]);
        });
        smallmenuoptions = newoptions;
        smallmenuoptionsstringed = smallmenuoptions.join(",") + ',';
        setSmallMenuOptionsString(smallmenuoptionsstringed);
        setUpdateSmallMenu(Math.random());
        setCitiesDropDown(true);
        logo.current.style.backgroundImage = `url("${assetpath}/assets/images/LhomeLogo.jpg")`;
        logo.current.style.backgroundRepeat = "no-repeat"
      })
        .catch(error => {
          console.log(error);
        });
    }
    getsettings();
  }, [screenwidth, assetpath]);

  React.useEffect(() => {
    function getsettings() {
      let api = simpleCallInitAPI(`${assetpath}/assets/settings.json`);
      api.then((data: any) => {
        menuoptions = data.data.settings.menuoptions
        smallmenuoptions = data.data.settings.smallmenuoptions;
        cities = data.data.settings.cities;
        menuGaps = data.data.settings.menuGaps;
        smallmenuGaps = data.data.settings.smallmenuGaps;
        let totalwidth = 0;
        if (screenwidth < 1320) {
          totalwidth = screenwidth - (document.querySelector("#logo") as HTMLDivElement).offsetWidth - 335;
        } else {
          totalwidth = screenwidth - (document.querySelector("#logo") as HTMLDivElement).offsetWidth - 450;
        }
        let residuewidth = 0;
        let newoptions = [];
        menuoptions.forEach((option: any, index: number) => {
          if (residuewidth + Number(menuGaps[index]) > totalwidth) {
            newoptions.push(option);
          } else {
          }
          residuewidth += Number(menuGaps[index]);
        });
        menuoptions = newoptions;
        menuoptionsstringed = menuoptions.join(",") + ',';
        setMenuOptionsString(menuoptionsstringed);
        setUpdateMenu(Math.random())
        totalwidth = screenwidth - (screenwidth * .6) - 100;
        residuewidth = 0;
        newoptions = [];
        smallmenuoptions.forEach((option: any, index: number) => {
          if (residuewidth + Number(smallmenuGaps[index]) > totalwidth) {
            newoptions.push(option);
          } else {
          }
          residuewidth += Number(smallmenuGaps[index]);
        });
        smallmenuoptions = newoptions;
        smallmenuoptionsstringed = smallmenuoptions.join(",") + ',';
        setSmallMenuOptionsString(smallmenuoptionsstringed);
        setUpdateSmallMenu(Math.random());
        setCitiesDropDown(true);
      })
        .catch(error => {
          console.log(error);
        });
    }
    getsettings();
  }, [assetpath, screenwidth]);

  return (
    <React.Fragment>
      <div className={css.headerOuter}>
        <div className={css.headerLeft}>
          <div id="logo" className={`${css.lhomelogoholder}`}>
            <div className={css.lhomelogo}>
              <div ref={logo} className={`${css.lhomelogobackground} ${css.lhomelogomask}`} />
            </div>
          </div>
        </div>
        <div className={css.headerRight}>
          <div className={css.smallMenuButtons}>
            <div className={css.toplist}>
            <input type="radio" id="radio_toggle"/>
            {<label htmlFor="radio_toggle" className={css.dots}>...</label> }
            <div className={css.topmenus}>
            {/* <div className={css.list}>
              <input type="checkbox" id="checkbox_toggle"/>
              {<label htmlFor="checkbox_toggle" className={`${css.hamburger}`}>...</label>}

              <div className={css.menus}> */}
                {smallmenuoptionsstring.indexOf("Partner With LHome,") < 0 ?
                  <div className={css.smallMenuBand}>
                    Partner With LHome
                  </div>
                  : <div className={css.smallMenuBand}>
                    Partner With LHome
                  </div>}
                {smallmenuoptionsstring.indexOf("Refer and Earn,") < 0 ?
                  <div className={css.smallMenuBand}>
                    Refer and Earn
                  </div>
                  : ''}
                {smallmenuoptionsstring.indexOf("Join Us,") < 0 ?
                  <div className={css.smallMenuBand}>
                    Join Us
                  </div>
                  : ''}
                {smallmenuoptionsstring.indexOf("Cities,") < 0 ?
                  <div className={css.smallMenuBand}>
                    <div className={`${css.cityText} ${css.textpaddingleft}`}>Cities</div>
                    <div>
                      {citiesdropdown ?
                        <CitiesDropDownMenu options={cities} positionmove={"1px"} />
                        : ''
                      }
                    </div>
                  </div>
                  : ''}
                {smallmenuoptionsstring.indexOf("Visit Us,") < 0 ?
                  <div className={css.smallMenuBand}>
                    Visit Us
                  </div>
                  : ''}
                {/* { smallmenuoptionsstring.indexOf("Customer Support,") < 0?                   
                    <div className={`${css.smallMenuBand} ${css.customWidthpx_14}`}>
                        <div className={`${css.smallmenuCustomerSupportIcon} ${css.iconpaddingtop}`}/>
                        <div className = {`${css.smallmenuCustomerSupportText} ${css.textpaddingleft}`}>
                            Customer Support                  
                        </div>
                    </div>
                  : <div className = {`${css.smallmenuCustomerSupportText} ${css.textpaddingleft}`}>
                  Customer Support                  
              </div>}    */}
                {smallmenuoptionsstring.indexOf(",Customer Support") < 0 ?
                  <div className={`${css.test}`}>
                    Customer Support
                  </div>
                  : ''}
              </div>
            </div>
            {smallmenuoptions.length > 0 && screenwidth && screenwidth < 725 ?
              <div id="dropdownoptions" rel="smalloptions" className={css.smallMenuBand}>
                <DropDownMenu updatesmallmenu={updatesmallmenu} options={smallmenuoptions} fontclass={"yes"} cities={cities} />
              </div>
              : ''
            }
          </div>
          <div className={css.largeMenuButtons} id="largeoptions">

            <div className={css.menuHolder}>
              <div className={css.list}>
                <input type="checkbox" id="checkbox_toggle" />
                {<label htmlFor="checkbox_toggle" className={`${css.hamburger}`}><CiMenuFries size={24} /></label>}

                <div className={css.menus}>
                  {menuoptionsstring.indexOf("Home,") < 0 ?
                    <div id="home" rel="largeoptions" className={css.largeMenuBand}>
                      Home
                    </div>
                    : ''
                  }
                  {menuoptionsstring.indexOf("Design Gallery,") < 0 ?
                    <div id="designgallery" rel="largeoptions" className={css.largeMenuBand}>
                      Design Gallery
                    </div>
                    : ''
                  }
                  {menuoptionsstring.indexOf("Modular Kitchen,") < 0 ?
                    <div id="modularkitchen" rel="largeoptions" className={css.largeMenuBand}>
                      Modular Kitchen
                    </div>
                    : ''
                  }
                  {menuoptionsstring.indexOf("Wardrobe,") < 0 ?
                    <div id="wardrobe" rel="largeoptions" className={css.largeMenuBand}>
                      Wardrobe
                    </div>
                    : ''
                  }
                  {menuoptionsstring.indexOf("Bedroom,") < 0 ?
                    <div id="bedroom" rel="largeoptions" className={css.largeMenuBand}>
                      Bedroom
                    </div>
                    : ''
                  }
                  {menuoptionsstring.indexOf("Living Room,") < 0 ?
                    <div id="livingroom" rel="largeoptions" className={css.largeMenuBand}>
                      Living Room
                    </div>
                    : ''
                  }
                  {menuoptionsstring.indexOf("Bath Room,") < 0 ?
                    <div id="bathroom" rel="largeoptions" className={css.largeMenuBand}>
                      Bath Room
                    </div>
                    : ''
                  }
                  {menuoptionsstring.indexOf("Space Saving Furniture,") < 0 ?
                    <div id="spacesavingfurniture" rel="largeoptions" className={css.largeMenuBand}>
                      Space Saving Furniture
                    </div>
                    : ''
                  }
                  {menuoptionsstring.indexOf("Home Office,") < 0 ?
                    <div id="homeoffice" rel="largeoptions" className={css.largeMenuBand}>
                      Home Office
                    </div>
                    : ''
                  }
                  {menuoptionsstring.indexOf("Others,") < 0 ?
                    <div id="others" rel="largeoptions" className={css.largeMenuBand}>
                      Others
                    </div>
                    : ''
                  }
                </div>
              </div>
              {menuoptions.length > 0 ?
                <div id="dropdownoptions" rel="largeoptions" className={`${css.largeMenuBand} ${css.customWidthpx_6}`}>
                  <DropDownMenu updatemenu={updatemenu} fontclass={""} options={menuoptions} />
                </div>
                : ''
              }
              <div className={css.userLoginRegisterHolder}>
                <button className={css.userLoginRegister}>
                  Login / Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </React.Fragment>
  )
}
export default Header;