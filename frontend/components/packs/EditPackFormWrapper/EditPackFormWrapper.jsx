import React, { Component, PropTypes } from 'react';
import { noop } from 'lodash';

import Button from 'components/buttons/Button';
import EditPackForm from 'components/forms/packs/EditPackForm';
import Icon from 'components/icons/Icon';
import packInterface from 'interfaces/pack';
import SelectTargetsDropdown from 'components/forms/fields/SelectTargetsDropdown';
import targetInterface from 'interfaces/target';

const baseClass = 'edit-pack-form';

class EditPackFormWrapper extends Component {
  static propTypes = {
    className: PropTypes.string,
    handleSubmit: PropTypes.func,
    isEdit: PropTypes.bool.isRequired,
    onCancelEditPack: PropTypes.func.isRequired,
    onEditPack: PropTypes.func.isRequired,
    onFetchTargets: PropTypes.func,
    pack: packInterface.isRequired,
    packTargets: PropTypes.arrayOf(targetInterface),
    targetsCount: PropTypes.number,
  };

  render () {
    const {
      className,
      handleSubmit,
      isEdit,
      onCancelEditPack,
      onEditPack,
      onFetchTargets,
      pack,
      packTargets,
      targetsCount,
    } = this.props;

    if (isEdit) {
      return (
        <EditPackForm
          className={className}
          formData={{ ...pack, targets: packTargets }}
          handleSubmit={handleSubmit}
          onCancel={onCancelEditPack}
          onFetchTargets={onFetchTargets}
          targetsCount={targetsCount}
        />
      );
    }

    return (
      <div className={`${className} ${baseClass}`}>
        <Button
          onClick={onEditPack}
          type="button"
          variant="brand"
          className={`${baseClass}__edit-btn`}
        >
          EDIT
        </Button>
        <h1 className={`${baseClass}__title`}><Icon name="packs" /> <span>{pack.name}</span></h1>
        <div className={`${baseClass}__description`}>
          <p>{pack.description}</p>
        </div>
        <SelectTargetsDropdown
          label="select pack targets"
          name="selected-pack-targets"
          onFetchTargets={onFetchTargets}
          onSelect={noop}
          selectedTargets={packTargets}
          targetsCount={targetsCount}
          disabled
          className={`${baseClass}__select-targets`}
        />
      </div>
    );
  }
}

export default EditPackFormWrapper;
