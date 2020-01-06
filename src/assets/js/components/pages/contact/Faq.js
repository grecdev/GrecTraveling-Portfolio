import React from 'react';

import SectionHeader from '../../global_layout/SectionHeader';

const Faq = () => {

	const displayFaq = e => {
		const icon = e.currentTarget.children[1];
		const faqInfo = e.currentTarget.nextElementSibling;
		const eventToggle = e.currentTarget.dataset.eventToggle;

		document.querySelectorAll('.show-info').forEach(box => box.classList.remove('show-info'));

		if (eventToggle === 'true') {
			faqInfo.classList.add('show-info');

			setTimeout(() => e.currentTarget.setAttribute('data-event-toggle', 'false'), 300);
		}
		if (eventToggle === 'false') {
			faqInfo.classList.remove('show-info');

			setTimeout(() => e.currentTarget.setAttribute('data-event-toggle', 'true'), 300);
		}

		icon.className === 'fas fa-caret-down' ? icon.className = 'fas fa-caret-up' : icon.className = 'fas fa-caret-down';

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

							<div className="faq-info">
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
