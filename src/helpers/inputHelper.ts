const inputHelper = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, data: any) => {
  const tempData: any = { ...data };

  tempData[event.target.name] = event.target.value;

  return tempData;
};

export default inputHelper;
