import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './modal.scss';

class ModalBox extends Component {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            drawerInClass: ''
        };
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({ drawerInClass: 'in' });
        }, 200);
    }

    componentDidMount() {
        window.addEventListener('keyup', (event) => {
            if (event.keyCode === 27) {
                this.props.onEvent('click');
            }
        });
    }
    componentDidUpdate() {
        window.addEventListener('load', this.removeAttribute());
    }
    getBody = () => {
        const { children, modalBodyChildren } = this.props;
        return (
            <div className={modalBodyChildren}>
                {children}
            </div>
        );
    }
    removeAttribute = () => {
        if (document.getElementsByClassName('modal-content').length > 0) {
            document.getElementsByClassName('modal-content')[0].removeAttribute('role');
        }
    }

    render() {
        if (this.props.hidden) {
            return null;
        }

        const { id, testId, className, ariaLabel, ariaLabelledby, ariaDescribedby, role, alt, ariaDisabled, ariaExpanded, ariaHidden, ariaInvalid, ariaHasPopup, ariaAutoComplete, tabIndex, bsClass, backdropCustomizeClass, modalBodyChildren, show } = this.props;

        return (
            <Modal
                id={id}
                data-id={testId}
                role={role}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledby}
                aria-describedby={ariaDescribedby}
                aria-disabled={ariaDisabled}
                aria-expanded={ariaExpanded}
                aria-invalid={ariaInvalid}
                alt={alt}
                aria-haspopup={ariaHasPopup}
                aria-autocomplete={ariaAutoComplete}
                tabIndex={tabIndex}
                aria-hidden={ariaHidden}
                autoFocus
                enforceFocus
                show={show}
                ariaModal
                backdropClassName={backdropCustomizeClass}
                dialogClassName={cn(this.state.drawerInClass, className)}
                bsClass={bsClass}
                modalBodyChildren={modalBodyChildren}
            >
                <Modal.Body>
                    {this.getBody()}
                </Modal.Body>
            </Modal>
        );
    }
}

ModalBox.propTypes = {
    alt: PropTypes.string,
    ariaAutoComplete: PropTypes.string,
    ariaDescribedby: PropTypes.string,
    ariaDisabled: PropTypes.bool,
    ariaExpanded: PropTypes.bool,
    ariaHasPopup: PropTypes.bool,
    ariaHidden: PropTypes.bool,
    ariaInvalid: PropTypes.bool,
    ariaLabel: PropTypes.string,
    ariaLabelledby: PropTypes.string,
    backdropCustomizeClass: PropTypes.string,
    bsClass: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    hidden: PropTypes.bool,
    id: PropTypes.string,
    modalBodyChildren: PropTypes.string,
    onEvent: PropTypes.func,
    role: PropTypes.string,
    show: PropTypes.bool,
    tabIndex: PropTypes.number,
    testId: PropTypes.string,
};

ModalBox.defaultProps = {
    alt: null,
    ariaAutoComplete: null,
    ariaDescribedby: null,
    ariaDisabled: false,
    ariaExpanded: null,
    ariaHasPopup: false,
    ariaLabel: null,
    ariaLabelledby: null,
    ariaHidden: false,
    ariaInvalid: false,
    backdropCustomizeClass: 'modal-backdrop',
    bsClass: 'modal',
    testId: '',
    role: null,
    tabIndex: null,
    children: undefined,
    className: 'drawer-slide',
    modalBodyChildren: 'modal-body-children',
    id: '',
    hidden: false,
    show: true,
    onEvent: () => {},
};

export default ModalBox;
