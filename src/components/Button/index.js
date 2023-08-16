import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { NavLink } from 'react-router-dom';

import { forwardRef } from 'react';

const cx = classNames.bind(styles);

// ... passProps là gồm tất cả các giá trị mà cha truyền vào

const Button = forwardRef(
    (
        {
            children,
            className,

            to,
            href,

            onClick,

            // Type button
            menuSetting = false,

            filled_1 = false,
            filled_2 = false,
            outline_1 = false,
            outline_2 = false,
            none_1 = false,
            none_2 = false,
            none_3 = false,
            none_4 = false,

            disable = false,
            rounded = false,

            leftIcon = false,
            rightIcon = false,

            // Size button
            small = false,
            large = false,

            ...passProps
        },
        ref,
    ) => {
        let Comp = 'button';

        const props = {
            onClick,
            ...passProps,
        };

        // Remove event handle when button is disable
        if (disable) {
            Object.keys(props).forEach((key) => {
                if (key.startsWith('on') && typeof props[key] === 'function') {
                    delete props[key];
                }
            });
        }

        // Handle switch router dom or export
        if (to) {
            props.to = to;
            Comp = NavLink;
        } else if (href) {
            props.href = href;
            Comp = 'a';
        }

        // Add class by ES6
        let classs = {
            menuSetting,

            filled_1,
            filled_2,
            outline_1,
            outline_2,
            none_1,
            none_2,
            none_3,
            none_4,

            disable,
            rounded,

            leftIcon,
            rightIcon,

            small,
            large,
        };

        return (
            <>
                <Comp className={cx('wrapper', classs, className)} {...props}>
                    {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
                    <span ref={ref} className={cx('children')}>
                        {children}
                    </span>
                    {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
                </Comp>
            </>
        );
    },
);

export default Button;
