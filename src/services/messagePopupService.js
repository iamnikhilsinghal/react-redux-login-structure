import swal from "sweetalert";

export function messagePopup(header, text, color) {
  swal(header, text, color);
}

export default messagePopup;
