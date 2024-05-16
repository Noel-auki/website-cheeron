
(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);




document.addEventListener("DOMContentLoaded", function() {
    initializeEventHandlers();
});


function initializeEventHandlers() {
    const subscribeBtn = document.getElementById("subscribeBtn");
    const sendMsgBtn = document.getElementById("sendMsgBtn");

    if (subscribeBtn) {
        subscribeBtn.addEventListener("click", handleSubscribe);
    }

    if (sendMsgBtn) {
        sendMsgBtn.addEventListener("click", handleSendMessage);
    }
}


function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function handleSubscribe() {
    const form = document.getElementById("subscribeForm");
    const formData = new FormData(form);
    const email = formData.get("email");

    if (!validateEmail(email)) {
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.innerHTML = "Please enter a valid email address.";
        errorMessage.style.display = "block";
        return;
    }

    const url = "https://script.google.com/macros/s/AKfycbxCW4UHRF7loYj-lKoWn9hf59ztCuyAk5LCioBbJqR5kX3mTG9JlvEUL6aWurOgeljCZQ/exec";

    fetch(url, {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            subscribeBtn.firstChild.nodeValue = "Subscribed ";
            document.getElementById("tickMark").style.display = "inline";
            document.getElementById("errorMessage").style.display = "none";
        } else {
            const errorMessage = document.getElementById("errorMessage");
            errorMessage.innerHTML = "An error occurred: " + data.message;
            errorMessage.style.display = "block";
        }
    })
    .catch(err => {
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.innerHTML = "An unexpected error occurred: " + err;
        errorMessage.style.display = "block";
    });
}

function handleSendMessage() {
    const form = document.getElementById("contactForm");
    const formData = new FormData(form);
    const email = formData.get("email");

    if (!validateEmail(email)) {
        const responseDiv = document.getElementById("formResponse");
        responseDiv.innerText = "Please enter a valid email address.";
        responseDiv.style.color = "red";
        return;
    }

    const url = "https://script.google.com/macros/s/AKfycbwFogy87kg-hi91i1ghuW0OFnKad8lbsup4JptPdLv_rgD1YEbw1ZIdU-ReuzZrtpa4Sg/exec";

    fetch(url, {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        const responseDiv = document.getElementById("formResponse");
        if (data.status === "success") {
            responseDiv.innerText = data.message;
            responseDiv.style.color = "rgb(31, 187, 31)";
        } else {
            responseDiv.innerText = "Error: " + data.message;
            responseDiv.style.color = "red";
        }
    })
    .catch(err => {
        console.error("Error:", err);
        const responseDiv = document.getElementById("formResponse");
        responseDiv.innerText = "An error occurred. Please try again.";
        responseDiv.style.color = "red";
    });
}