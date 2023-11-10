type ApiResponse = {
  data?: {
    statusCode?: number;
    isSuccess?: boolean;
    errorMessages?: Array<string>;
    result?: {
      [key: string]: string;
    };
  };
  error?: any;
};

export default ApiResponse;
