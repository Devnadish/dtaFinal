declare module "ipinfo" {
    interface IPInfoResponse {
      ip: string;
      city: string;
      region: string;
      country: string;
      countryCode: string;
      loc: string;
      timezone: string;
    }
  
    function ipinfo(ip: string, token?: string): Promise<IPInfoResponse>;
  
    export = ipinfo;
  }