declare module 'react-google-recaptcha' {
  import { Component } from 'react';

  interface ReCAPTCHAProps {
      sitekey: string;
      //onChange: (value: string | null) => void;
      onExpired?: () => void;
      onErrored?: () => void;
      size?: 'normal' | 'compact' | 'invisible';
      theme?: 'light' | 'dark';
      tabindex?: number;
      hl?: string;
      badge?: 'bottomright' | 'bottomleft' | 'inline';
      stoken?: string;
      action?: string;
  }

  export default class ReCAPTCHA extends Component<ReCAPTCHAProps> {
      execute: () => Promise<string>;
      executeAsync: () => Promise<string>; 
      reset: () => void; 
  }
}
