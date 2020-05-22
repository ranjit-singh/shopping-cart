// import cart from '../../mock/cart.json';
export default(callBack: (arg0: string) => void) => {
var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200 || this.status == 304) {
        callBack(this.responseText);
    }
  };
  xhttp.open('GET', '../../mock/cart.json', true);
  xhttp.send();
}
