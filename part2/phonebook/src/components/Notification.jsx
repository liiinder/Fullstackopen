const Notification = ({ notification }) => {
    if (!notification.length) {
        return null
    }
    else {
        const type = notification[0]
        const message = notification[1]
        console.log(notification)
        return (
            <div className={type}>
                {message}
            </div>
        )
    }
}

export default Notification