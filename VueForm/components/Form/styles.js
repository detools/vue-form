const styles = {
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'no-wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  buttons_center: {
    justifyContent: 'center',
  },
  buttons_end: {
    justifyContent: 'flex-end',
  },
  buttons_container_sticky: {
    height: '60px',
    position: 'fixed',
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    paddingRight: '50px',
    borderTop: '1px solid #dadada',
    borderBottom: '1px solid #dadada',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 10px 2px rgba(0, 0, 0, 0.2)',
    zIndex: 3,
  },
  sticky_placeholder: {
    height: '60px',
  },
}

export default styles
