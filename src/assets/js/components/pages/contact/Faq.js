import React from 'react';

import SectionHeader from '../../global_layout/SectionHeader';

const Faq = () => {

	const displayFaq = e => {
		const icon = e.currentTarget.children[1];
		const faqInfo = e.currentTarget.nextElementSibling;
		const eventToggle = e.currentTarget.dataset.eventToggle;

		if (eventToggle === 'true') {

			if (faqInfo.classList.contains('show-info')) faqInfo.classList.remove('show-info');
			else {
				// Hide all boxes when display only one
				document.querySelectorAll('.faq-info').forEach(box => box.classList.remove('show-info'));
				faqInfo.classList.add('show-info');
			}

			// Reset icons when hide boxes 
			if (icon.classList.contains('fa-caret-up')) icon.classList.replace('fa-caret-up', 'fa-caret-down');
			else {
				document.querySelectorAll('.faq-header i').forEach(icon => icon.classList.replace('fa-caret-up', 'fa-caret-down'));
				icon.classList.replace('fa-caret-down', 'fa-caret-up');
			}

			document.querySelectorAll('[data-event-toggle]').forEach(event => event.setAttribute('data-event-toggle', 'false'));

			// Event toggler so when we click on a box we don't trigger the event on each click
			setTimeout(() => document.querySelectorAll('[data-event-toggle]').forEach(event => event.setAttribute('data-event-toggle', 'true')), 350);
		}

		e.stopPropagation();
	}

	return (
		<section id='faq'>
			<div className="container p-3">
				<SectionHeader title={'Frequently Asked Questions'} image={'section-header-logo-blue.svg'} />

				<div className="faq-container">
					<div className="faq-image overlay overlay-light"></div>

					<div className="faq-content">
						<div className="faq-box">
							<div onClick={displayFaq} data-event-toggle='true' className="faq-header mb-1"><h4>Who we are ?</h4> <i className="fas fa-caret-down"></i></div>

							<div className="faq-info show-info">
								<p className='p-1'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium accusamus deserunt veritatis earum pariatur quaerat sequi sit facere sint sed quibusdam temporibus placeat quisquam harum iusto atque quia, ut voluptate eveniet, at voluptatum. Iusto consectetur voluptatum natus cum maiores fuga quae veniam aspernatur sint vel deserunt, tempora possimus repudiandae doloremque?</p>
							</div>
						</div>

						<div className="faq-box">
							<div onClick={displayFaq} data-event-toggle='true' className="faq-header mb-1"><h4>What we do ?</h4> <i className="fas fa-caret-down"></i></div>

							<div className="faq-info">
								<p className='p-1'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium accusamus deserunt veritatis earum pariatur quaerat sequi sit facere sint sed quibusdam temporibus placeat quisquam harum iusto atque quia, ut voluptate eveniet, at voluptatum. Iusto consectetur voluptatum natus cum maiores fuga quae veniam aspernatur sint vel deserunt, tempora possimus repudiandae doloremque?</p>
							</div>
						</div>

						<div className="faq-box">
							<div onClick={displayFaq} data-event-toggle='true' className="faq-header mb-1"><h4>How to pay ?</h4> <i className="fas fa-caret-down"></i></div>

							<div className="faq-info">
								<p className='p-1'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium accusamus deserunt veritatis earum pariatur quaerat sequi sit facere sint sed quibusdam temporibus placeat quisquam harum iusto atque quia, ut voluptate eveniet, at voluptatum. Iusto consectetur voluptatum natus cum maiores fuga quae veniam aspernatur sint vel deserunt, tempora possimus repudiandae doloremque?</p>
							</div>
						</div>

						<div className="faq-box">
							<div onClick={displayFaq} data-event-toggle='true' className="faq-header mb-1"><h4>Money back guarantee</h4> <i className="fas fa-caret-down"></i></div>

							<div className="faq-info">
								<p className='p-1'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium accusamus deserunt veritatis earum pariatur quaerat sequi sit facere sint sed quibusdam temporibus placeat quisquam harum iusto atque quia, ut voluptate eveniet, at voluptatum. Iusto consectetur voluptatum natus cum maiores fuga quae veniam aspernatur sint vel deserunt, tempora possimus repudiandae doloremque?</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Faq;
