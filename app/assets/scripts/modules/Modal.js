import $ from 'jquery';

class Modal {
	constructor() {
		this.openModalButton = $(".open-modal"); /*trigger OPEN modal buttons*/
		this.modal = $(".modal"); /*modal section which will be opened/closed*/
		this.closeModalButton = $(".modal__close"); /*trigger CLOSE modal buttons*/

		this.events();
	}

	events() {
		// clicking open modal button
		this.openModalButton.click(this.openModal.bind(this));

		// ??? bind vs call vs apply

		// clicking x close modal button
		this.closeModalButton.click(this.closeModal.bind(this));

		// user pushes any key
		$(document).keyup(this.keyPressHandler.bind(this));
	}

	keyPressHandler(e) { /* where did e came from???? */
		if (e.keyCode == 27) {
			this.closeModal();
		}
	} /*if ESC button pressed >> call closeModal method*/

	openModal() {
		this.modal.addClass("modal--is-visible");
		return false; // preventing browser of scrolling to top of page
	}

	closeModal() {
		this.modal.removeClass("modal--is-visible");
	}


}

export default Modal;