(() => {
	const App = {
		$: {
			scrollToRevealArray: document.querySelectorAll('.scroll-to-reveal'),
			ctaBtn: document.querySelector('.cta'),
			mobileList: document.querySelector('.mobile-list'),
			navIcon: document.querySelector('.nav--icon'),
			btns: document.querySelectorAll('.js-btn'),
			sections: document.querySelectorAll('.js-section'),
			getTimeAgoItems: () => document.querySelectorAll('.time-ago'),
		},
		initTinySlider: () => {
			// eslint-disable-next-line no-undef
			const slider = tns({
				container: '.slide__container',
				arrowKeys: true,
				loop: false,
				rewind: false,
				mode: 'gallery',
				controlsText: [
					'<i class="fas fa-angle-left"></i>',
					'<i class="fas fa-angle-right"></i>',
				],
				nav: false,
			});

			slider.events.on('transitionEnd', () => {
				App.calcTimeAgo();
			});
			App.calcTimeAgo();
		},
		calcTimeAgo: () => {
			const items = App.$.getTimeAgoItems();

			if (items.length) {
				for (let i = 0; i < items.length; i++) {
					const date = items[i].getAttribute('data-date');

					// eslint-disable-next-line no-undef
					items[i].innerHTML = moment(date.split('-')).fromNow();
				}
			}
		},
		setActiveLink: (event, buttons) => {
			for (let i = 0; i < buttons.length; i++) {
				buttons[i].classList.remove('selected');
			}

			event.target.classList.add('selected');
		},
		smoothScrollTo: (i, buttons, event) => {
			const sections = App.$.sections;
			const element = sections[i - 1] || sections[i - 8];

			App.setActiveLink(event, buttons);

			if (App.$.mobileList.classList.contains('show')) {
				App.$.mobileList.classList.toggle('show');
			}

			window.scrollTo({
				behavior: 'smooth',
				top: element ? element.offsetTop - 100 : 0,
				left: 0,
			});
		},
		initScrollToReveal: () => {
			const scrollToRevealArray = App.$.scrollToRevealArray;

			for (let i = 0; i < scrollToRevealArray.length; i++) {
				// eslint-disable-next-line no-undef
				new Waypoint({
					element: scrollToRevealArray[i],
					// eslint-disable-next-line unused-imports/no-unused-vars, no-unused-vars
					handler(direction) {
						this.element.classList.add('fadeInUp');
					},
					// eslint-disable-next-line no-undef
					offset: Waypoint.viewportHeight(),
				});
			}
		},
		initScrollToRevealNav: () => {
			// eslint-disable-next-line no-undef
			new Waypoint({
				element: App.$.ctaBtn,
				handler(direction) {
					if (direction === 'down') {
						document.querySelector('nav').classList.add('fixed');
					} else {
						document.querySelector('nav').classList.remove('fixed');
					}
				},
				offset: -80,
			});
		},
		attachBtsForSmoothScroll: () => {
			const btns = App.$.btns;
			const sections = App.$.sections;

			if (btns.length && sections.length > 0) {
				for (let i = 0; i < btns.length; i++) {
					btns[i].addEventListener(
						'click',
						App.smoothScrollTo.bind(this, i, btns),
					);
				}
			}
		},
		listenerNavIcon: () => {
			const navIcon = App.$.navIcon;

			navIcon.addEventListener('click', () => {
				document.querySelector('.mobile-list').classList.toggle('show');
			});
		},
		stats: {
			getWeeksArray: () => {
				const weekArray = [];

				for (let i = 0; i < 30; i++) {
					weekArray.push(`3/${i}`);
				}

				return weekArray;
			},
			getGeneratedLineData: (numbers) => ({
				labels: App.stats.getWeeksArray(),
				datasets: [
					{
						borderColor: 'rgba(174,155,255,0.67)',
						pointColor: '#AE9BFF',
						data: numbers,
						pointRadius: 4,
						borderWidth: 1,
						pointBackgroundColor: '#C0B2FC',
					},
				],
			}),
			getGeneratedBarData: (numbers) => {
				const labels = App.stats.getWeeksArray();

				return {
					labels: App.stats.getWeeksArray(),
					datasets: [
						{
							labels,
							backgroundColor: 'rgba(174,155,255,0.67)',
							data: numbers,
						},
					],
				};
			},
			randomArray: (length, max) =>
				// eslint-disable-next-line prefer-spread
				Array.apply(null, Array(length)).map(() =>
					Math.round(Math.random() * max),
				),
		},
		generateCharts: () => {
			for (let i = 0; i < 6; i++) {
				const ctx = document
					.getElementById(`stats-${i}`)
					.getContext('2d');
				// eslint-disable-next-line no-var
				var type, dataType;

				if (i !== 1 && i !== 4) {
					type = 'line';
					dataType = App.stats.getGeneratedLineData(
						App.stats.randomArray(30, 1000),
					);
				} else {
					type = 'bar';
					dataType = App.stats.getGeneratedBarData(
						App.stats.randomArray(30, 1000),
					);
				}

				// eslint-disable-next-line no-undef
				new Chart(ctx, {
					type,
					data: dataType,
					scaleShowVerticalLines: false,
					scaleGridLineColor: 'black',
					options: {
						responsive: true,
						maintainAspectRatio: false,
						elements: {
							line: {
								tension: 0,
							},
						},
						legend: {
							display: false,
						},
						scales: {
							yAxes: [
								{
									ticks: {
										fontColor: '#444363',
										fontSize: 12,
									},
								},
							],
							xAxes: [
								{
									ticks: {
										fontColor: '#444363',
										fontSize: 12,
									},
								},
							],
						},
					},
				});
			}
		},
		init() {
			App.generateCharts();
			App.initTinySlider();
			App.initScrollToReveal();
			App.initScrollToRevealNav();
			App.attachBtsForSmoothScroll();
			App.listenerNavIcon();
		},
	};

	App.init();
})();
