declare module 'ipinfo' {
  interface IPInfoResponse {
    ip: string;
    hostname?: string;
    city?: string;
    region?: string;
    country?: string;
    countryCode?: string;
    loc?: string;
    org?: string;
    postal?: string;
    timezone?: string;
  }

  function ipinfo(ipAddress: string, token?: string): Promise<IPInfoResponse>;
  export = ipinfo;
}
