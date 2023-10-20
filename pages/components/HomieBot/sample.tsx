import React, { Component } from "react";

declare global {
  interface Window {
    kommunicate: any;
  }
}

class MyWebpage extends Component {
  componentDidMount() {
    (function (d, m) {
      var kommunicateSettings = {
        // ... other settings ...

        onInit: function () {
          // Create a custom box with SVG and link
          var customBox = document.createElement('div');
          customBox.classList.add('my-custom-box');

          customBox.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.59 2.59C14.21 2.21 13.7 2 13.17 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8.83C20 8.3 19.79 7.79 19.41 7.42L14.59 2.59ZM15 18H9C8.45 18 8 17.55 8 17C8 16.45 8.45 16 9 16H15C15.55 16 16 16.45 16 17C16 17.55 15.55 18 15 18ZM15 14H9C8.45 14 8 13.55 8 13C8 12.45 8.45 12 9 12H15C15.55 12 16 12.45 16 13C16 13.55 15.55 14 15 14ZM13 8V3.5L18.5 9H14C13.45 9 13 8.55 13 8Z" fill="white"/></svg><a href="https://example.com" target="_blank" style="margin-left: 10px; margin-right: 120px;font-size: 14px; text-align: center; color: white; text-decoration: none;">Check out your ITR Summary</a><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.4175 12.99L16.5875 12.99L11.7075 17.87C11.3175 18.26 11.3175 18.9 11.7075 19.29C12.0975 19.68 12.7275 19.68 13.1175 19.29L19.7075 12.7C20.0975 12.31 20.0975 11.68 19.7075 11.29L13.1175 4.70002C12.7275 4.31002 12.0975 4.31002 11.7075 4.70002C11.3175 5.09002 11.3175 5.72002 11.7075 6.11002L16.5875 10.99L5.4175 10.99C4.8675 10.99 4.4175 11.44 4.4175 11.99C4.4175 12.54 4.8675 12.99 5.4175 12.99Z" fill="white"/></svg>';
          var style = document.createElement('style');
          style.textContent = '.my-custom-box {background-color: rgb(0,176,203); text-align: center; display: flex; align-items: center; font-weight: bold; height: 45px; width: 100%; border: none; cursor: pointer;}';

          customBox.addEventListener('click', function () {
            window.open('https://example.com', '_blank');
          });

          var chatboxContainer = document.querySelector('.km-header-container');
          chatboxContainer.appendChild(customBox);
          chatboxContainer.appendChild(style);
        },
      };

      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }

  render() {
    return (
      <div>
        <h1>My Webpage</h1>
        <p>Hello World</p>
      </div>
    );
  }
}

export default MyWebpage;
