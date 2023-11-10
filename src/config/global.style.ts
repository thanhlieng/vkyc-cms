import { Descriptions, Select } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import { BOX_SHADOW } from './theme';

const GlobalStyle = createGlobalStyle`
  :root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  .gx-app-sidebar * {
    -webkit-user-select: none;  /* Chrome all / Safari all */
    -moz-user-select: none;     /* Firefox all */
    -ms-user-select: none;      /* IE 10+ */
    user-select: none;
  }

  html {
    font-size: 62.5%;
    height: 100%;
    max-width: 100vw;

    overflow: hidden;
    line-height: 1.6rem;
    font-weight: 500;

    box-sizing: border-box;
  }

  * {
    box-sizing: inherit;
    font-family: 'Quicksand', sans-serif !important;
  }


  body {
    padding: 0;
    margin: 0;
    min-height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    font-size: 1.5rem;
  }


  #app-site {
    display: flex;
    width: 100%;
    height: 100vh;
  }

  #__next {
   height: 100%;
  }

  .ant-descriptions-item-content {
    font-weight: bold;
  }

  span.ant-descriptions-item-label {
    min-width: 100px;
  }


  .ant-descriptions-bordered .ant-descriptions-view {
    border: none;
  }

  .rowTableSelect  {
    color: rgba(24,144,255) !important;
    transition: background .2s ease-in-out;
    background-color: white;
    /* & * {font-weight: 600 !important;} */
    & td:first-child  *{
      color: black;
    }

    &.ant-table-row-selected {
      color: black;
    }

    &:hover {
      color: black;

    }
  }

  .rowTableSelect td {
    border-top:  1px solid rgba(24,144,255,.5);
  }

  .rowTableSelect > td:last-child {
    border-right:  1px solid rgba(24,144,255,.5) !important;
  }

  .rowTableSelect > td:first-child {
    border-left:  1px solid rgba(24,144,255,.5);
  }

  .ant-table-expanded-row > td {
    border-right: 1px solid rgba(24,144,255,.5) !important;
    border-left: 1px solid rgba(24,144,255,.5) !important;
    border-bottom: 1px solid rgba(24,144,255,.5) !important;
  }
  td.ant-descriptions-item {
    padding: 0 16px 16px;
  }
/* custom scrollbar */
::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}

  /* .gx-layout-sider-dark {
    background: rgba(24, 60, 128, 1);
  }
  ul.ant-menu.ant-menu-root.ant-menu-inline.ant-menu-dark {
    background-color: transparent;
  } */
  label.ant-form-item-no-colon {
    white-space: break-spaces;
}

.gx-layout-sider-scrollbar {
  height: calc(100vh - 230px) !important
}

.disabled {
   pointer-events: none; 
   opacity: 0.5;
   text-decoration: line-through;
}

.ant-form-item-has-feedback .ant-input-affix-wrapper .ant-input-suffix {
  padding-right: 0;
}

.gx-app-nav > li {
  cursor: pointer;
}

.row-dragging {
  background: #fafafa;
  border: 1px solid #ccc;
}

.row-dragging td {
  padding: 16px;
}

.row-dragging .drag-visible {
  visibility: visible;
}

@media screen and (max-width: 575px) {
  .gx-main-content-wrapper {
    padding: 6px 0 0;
  }
}
 
.home_picker * {
  font-size: 14px;
  font-weight: 600;
  padding-bottom: 0;
}

.home_picker .rdrMonth {
  padding-bottom: 4px
}
@media screen and (max-width: 1367px) {
  .home_picker * {
    font-size: 13px;
  }
}
.ant-upload-list-item-info img.ant-upload-list-item-image {
  & {
    object-fit: cover !important;
  }
}

::-webkit-input-placeholder { /* Edge */
  font-weight: 600 !important;
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  font-weight: 600 !important;
}

::placeholder {
  font-weight: 600 !important;
}

.ant-popover-buttons {
  display: flex;
  justify-content: center;
}

`;

export const DefaultSelectStyled = styled(Select)`
    width: 200px;
`;

export const TitleCard = styled.h3`
    text-transform: uppercase;
    font-weight: 600;
    font-size: 16px;
`;

export const TitleCardDes = styled.h3`
    flex: auto;
    overflow: hidden;
    color: #535353;
    font-weight: bold;
    font-size: 16px;
    line-height: 1.3;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
`;

export const DescriptionStyled = styled(Descriptions)`
    & .ant-descriptions-view {
        border: 1px solid #f0f0f0;
    }
`;

export default GlobalStyle;
