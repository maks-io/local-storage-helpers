export const getSpaceRemaining = (): number => {
  let increase = true,
    data = "1",
    totalData = "",
    trytotalData = "";

  let itemBackup = localStorage.getItem("");

  while (true) {
    try {
      trytotalData = totalData + data;
      localStorage.setItem("", trytotalData);
      totalData = trytotalData;
      if (increase) data += data;
    } catch (e) {
      if (data.length < 2) break;
      increase = false;
      data = data.substring(data.length / 2);
    }
  }

  localStorage.setItem("", itemBackup);

  return totalData.length;
};
