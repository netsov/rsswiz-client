import React from 'react';

import './style.css';
import MultipleInput from '../MultipleInput';
import Switch from '../Switch';
import ActionButton from '../ActionButton';

const sanitizeHashtag = tag => tag.replace(/#/g, '');

export default class Filter extends React.Component {
  static defaultProps = {
    url_keywords: [],
    url_keywords_ne: [],
    hashtags: [],
    hashtags_ne: [],
    exclude_replies: false,
    exclude_retweets: false,
  };

  handleExcludeToggle = field => () => () => {
    this.props.updateFeed({ [field]: !this.props[field] });
  };

  handleAddToList = (name, normalizer) => value => {
    value = normalizer ? normalizer(value) : value;
    value = value.replace(/\s/g, '');
    if (!value) return;
    if (this.props[name].includes(value)) return;
    this.props.updateFeed({ [name]: [...this.props[name], value] });
  };

  handleRemoveFromList = name => value => {
    this.props.updateFeed({
      [name]: this.props[name].filter(i => i !== value),
    });
  };

  handleClear = () => this.props.updateFeed(Filter.defaultProps);

  renderExclude = (field, label) => {
    const checked = !!this.props[field];
    const disabled = this.props.loading;
    return (
      <div className="switch-row">
        <Switch
          label={label}
          value={field}
          onToggle={this.handleExcludeToggle(field)}
          checked={checked}
          disabled={disabled}
        />
      </div>
    );
  };

  renderMultipleInputs = () => {
    const { url_keywords, url_keywords_ne, hashtags, hashtags_ne } = this.props;
    return [
      {
        placeholder: 'Include Domains',
        values: url_keywords,
        onAdd: this.handleAddToList('url_keywords'),
        onDelete: this.handleRemoveFromList('url_keywords'),
      },
      {
        placeholder: 'Include Hashtags',
        values: hashtags,
        onAdd: this.handleAddToList('hashtags', sanitizeHashtag),
        onDelete: this.handleRemoveFromList('hashtags', sanitizeHashtag),
      },
      {
        placeholder: 'Exclude Domains',
        values: url_keywords_ne,
        onAdd: this.handleAddToList('url_keywords_ne'),
        onDelete: this.handleRemoveFromList('url_keywords_ne'),
      },
      {
        placeholder: 'Exclude Hashtags',
        values: hashtags_ne,
        onAdd: this.handleAddToList('hashtags_ne', sanitizeHashtag),
        onDelete: this.handleRemoveFromList('hashtags_ne', sanitizeHashtag),
      },
    ].map(props => <MultipleInput key={props.placeholder} {...props} />);
  };

  renderClearBtn = () => {
    return (
      <ActionButton
        disabled={this.props.loading}
        handleClick={this.handleClear}
      >
        Clear filters
      </ActionButton>
    );
  };

  render() {
    return (
      <div className="filter-container">
        {this.renderExclude('exclude_replies', 'Exclude replies')}
        {this.renderExclude('exclude_retweets', 'Exclude retweets')}
        <br />
        {this.renderMultipleInputs()}
        {this.renderClearBtn()}
      </div>
    );
  }
}
