import React from "react";
import { connect } from 'react-redux';
import { selectCollection } from "../../redux/shop/shop.selectors";

import './collection.styles.scss';

const CollectionPage = ({ collection }) => (
    <div>
        <div className="collection-page">
            <h2>CATEGORY PAGE</h2>
        </div>
    </div>
);

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
