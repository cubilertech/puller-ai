export const icons = {
  logo: "/Images/logos/logo.svg",
  outlinedBookMark: "/Images/Icons/outlined-bookMark.svg",
  logoTitle: "/Images/logos/logo-text.svg",
  logoIcon: "/Images/logos/logo-icon.svg",
  annotation: "/Images/Icons/annotation-icon.svg",
  bell: "/Images/Icons/bell-icon.svg",
  ellipse: "/Images/Icons/ellipse-icon.svg",
  plus: "/Images/Icons/plus-icon.svg",
  minus: "/Images/Icons/minus-icon.svg",
  importIcon: "/Images/Icons/eye-icon.svg",
  eyeIcon: "/Images/Icons/import-icon.svg",
  arrowLeftIcon: "/Images/Icons/arrow-left.svg",
  requestIcon: "/Images/Icons/request-icon.svg",
  pullsIcon: "/Images/Icons/pulls-icon.svg",
  adminIcon: "/Images/Icons/admin-icon.svg",
  advancedIcon: "/Images/Icons/advanced-icon.svg",
  retrieversIcon: "/Images/Icons/retrivers-icon.svg",
  alertsIcon: "/Images/Icons/alerts-icon.svg",
  arrowDown: "/Images/Icons/arrow-down.svg",
  paginationLeft: "/Images/Icons/arrow-left-icon.svg",
  paginationRight: "/Images/Icons/arrow-right-icon.svg",
  search: "/Images/Icons/search-icon.svg",
  actions: "/Images/Icons/actions-icon.svg",
  info: "/Images/Icons/info-icon.svg",
  infoHover: "/Images/Icons/info-hover-icon.svg",
  snowflake: "/Images/Icons/snowflake-icon.svg",
  segment: "/Images/Icons/segment-icon.svg",
  lytics: "/Images/Icons/lytics-icon.svg",
  dataRoom: "/Images/Icons/data-room-icon.svg",
  dbtCore: "/Images/Icons/dbt-core-icon.svg",
  sfCrm: "/Images/Icons/sf-crm-icon.svg",
  clReport: "/Images/Icons/cl-report-icon.svg",
  nielsen: "/Images/Icons/nielson-icon.svg",
  googleAnalytics: "/Images/Icons/google-analytics-icon.svg",
  clickstream: "/Images/Icons/clickstream-icon.svg",
  live: "/Images/Icons/live-icon.svg",
  blocked: "/Images/Icons/blocked-icon.svg",
  issues: "/Images/Icons/issues-icon.svg",
  needPermissions: "/Images/Icons/need-permissions-icon.svg",
  connectApps: "/Images/Icons/connect-apps-icon.svg",
  apiKey: "/Images/Icons/api-key-icon.svg",
  upload: "/Images/Icons/upload-icon.svg",
  cloudUpload: "/Images/Icons/cloud-upload-icon.svg",
  folder: "/Images/Icons/folder-icon.svg",
  cpu: "/Images/Icons/cpu-icon.svg",
};

export const PagesType = {
  RECENT_REQUESTS: "recent",
  YOUR_RESULTS: "yourResults",
  CREATE_REQUEST: "createRequest",
  PREVIEW_DATA: "preview",
  CONNECT_APP: "connect",
};

export const isClient = typeof window !== "undefined";


export const ACTIVE_TYPES = {
  ALL: "all",
  UNREAD: "unread",
  PUBLIC: "public",
  PRIVATE: "private",
};
export const ICONS_TYPES = {
  LOGO: "logo",
  OUTLINEDBOOKMARK: "outlinedBookMark",
  LOGOTITLE: "logoTitle",
  LOGOICON: "logoIcon",
  ANNOTATION: "annotation",
  BELL: "bell",
  ELLIPSE: "ellipse",
  PLUS: "plus",
  MINUS: "minus",
  IMPORTICON: "importIcon",
  EYEICON: "eyeIcon",
  ARROWLEFTICON: "arrowLeftIcon",
  REQUESTICON: "requestIcon",
  PULLSICON: "pullsIcon",
  ADMINICON: "adminIcon",
  ADVANCEDICON: "advancedIcon",
  RETRIEVERSICON: "retrieversIcon",
  ALERTSICON: "alertsIcon",
  ARROWDOWN: "arrowDown",
  PAGINATIONLEFT: "paginationLeft",
  PAGINATIONRIGHT: "paginationRight",
  SEARCH: "search",
  ACTIONS: "actions",
  INFO: "info",
  INFOHOVER: "infoHover",
  SNOWFLAKE: "snowflake",
  SEGMENT: "segment",
  LYITICS: "lytics",
  DATAROOM: "dataRoom",
  DBTCORE: "dbtCore",
  SFCRM: "sfCrm",
  CLREPORT: "clReport",
  NIELSEN: "nielsen",
  GOOGLEANALYTICS: "googleAnalytics",
  CLICKSTREAM: "clickstream",
  LIVE: "live",
  BLOCKED: "blocked",
  ISSUES: "issues",
  NEEDPERMISSIONS: "needPermissions",
  CONNECTAPPS: "connectApps",
  APIKEY: "apiKey",
  UPLOAD: "upload",
  CLOUDUPLOAD: "cloudUpload",
  FOLDER: "folder",
  CPU: "cpu",
};

export const dummySQL = `
SELECT 
  Store_ID, 
  DATE_TRUNC(TXN_DATE, 'week') AS Week, 
  SUM(TXN_AMT) AS Total_Sales
FROM 
  TXN_SZNAL
WHERE 
  PROD_ID IN (1234, 5678) AND
  TXN_DATE >= DATE_ADD(CURRENT_DATE(), INTERVAL) AND
  DATE_TRUNC(TXN_DATE, 'week') AS Week, 
  TXN_DATE <= DATE_TRUNC(CURRENT_DATE(), 'week')
  DATE_TRUNC(TXN_DATE, 'week') AS Week, 
  TXN_DATE <= DATE_TRUNC(CURRENT_DATE(), 'week')
  DATE_TRUNC(TXN_DATE, 'week') AS Week, 
  TXN_DATE <= DATE_TRUNC(CURRENT_DATE(), 'week')
  DATE_TRUNC(TXN_DATE, 'week') AS Week, 
  TXN_DATE <= DATE_TRUNC(CURRENT_DATE(), 'week')
  DATE_TRUNC(TXN_DATE, 'week') AS Week, 
  TXN_DATE <= DATE_TRUNC(CURRENT_DATE(), 'week')
  DATE_TRUNC(TXN_DATE, 'week') AS Week, 
  TXN_DATE <= DATE_TRUNC(CURRENT_DATE(), 'week')
  DATE_TRUNC(TXN_DATE, 'week') AS Week, 
  TXN_DATE <= DATE_TRUNC(CURRENT_DATE(), 'week')
  DATE_TRUNC(TXN_DATE, 'week') AS Week, 
  PROD_ID IN (1234, 5678) AND
  TXN_DATE >= DATE_ADD(CURRENT_DATE(), INTERVAL) AND
  Store_ID,
  PROD_ID IN (1234, 5678) AND
  TXN_DATE >= DATE_ADD(CURRENT_DATE(), INTERVAL) AND
  Store_ID,

  PROD_ID IN (1234, 5678) AND
  TXN_DATE >= DATE_ADD(CURRENT_DATE(), INTERVAL) AND
  Store_ID,
  PROD_ID IN (1234, 5678) AND
  TXN_DATE >= DATE_ADD(CURRENT_DATE(), INTERVAL) AND  PROD_ID IN (1234, 5678) AND
  TXN_DATE >= DATE_ADD(CURRENT_DATE(), INTERVAL) AND  PROD_ID IN (1234, 5678) AND
  TXN_DATE >= DATE_ADD(CURRENT_DATE(), INTERVAL) AND  PROD_ID IN (1234, 5678) AND
  TXN_DATE >= DATE_ADD(CURRENT_DATE(), INTERVAL) AND
  Store_ID,
  Store_ID,
  Store_ID,
  Store_ID,

GROUP BY 
  PROD_ID IN (1234, 5678) AND
  TXN_DATE >= DATE_ADD(CURRENT_DATE(), INTERVAL) AND
  Store_ID, 
  Week
ORDER BY 
  Week, 
  Store_ID;
`;