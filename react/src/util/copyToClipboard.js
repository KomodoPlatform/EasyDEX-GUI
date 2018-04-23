const copyToClipboard = (value) => {
  let result;
  let copyTextarea = document.querySelector('#js-copytextarea');

  document.getElementById('js-copytextarea').value = value;
  copyTextarea.select();

  try {
    document.execCommand('copy');
    result = 1;
  } catch (err) {
    result = 0;
  }

  return result;
};

export default copyToClipboard;