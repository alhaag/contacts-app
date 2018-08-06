import React from 'react'

const PageWrapper = (props) => {
    return (
        <div style={styles.wrapper}>
            {props.children}
        </div>
    )
}

const styles = {
    wrapper: {
        padding: '20px',
    }
}

export default PageWrapper