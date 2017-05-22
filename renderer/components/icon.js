export default props => {
  const { name, ...domProps } = props
  return <i className={`fa fa-${props.name}`} aria-hidden="true" {...domProps} />
}
