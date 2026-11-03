// Links that open a new tab say so, so screen reader users know Back won't return them here.
const newTab = ' (opens in a new tab)';

// `label` names an icon-only link; text links are named by their content.
const ExternalLink = ({ label, children, ...props }) => {
    return (
        <a {...props} target="_blank" rel="noreferrer" aria-label={label ? label + newTab : undefined}>
            {children}
            {!label && <span className="visually-hidden">{newTab}</span>}
        </a>
    )
}

export default ExternalLink;
