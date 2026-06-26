import Select from 'react-select'

export default function SearchableMultiSelect({
  options,
  value,
  onChange,
  placeholder
}) {
  const formattedOptions = options.map(item => ({
    value: item,
    label: item
  }))

  const selected = value.map(item => ({
    value: item,
    label: item
  }))

  return (
    <Select
      isMulti
      options={formattedOptions}
      value={selected}
      onChange={(selectedItems) =>
        onChange(selectedItems ? selectedItems.map(i => i.value) : [])
      }
      placeholder={placeholder}
      className="text-sm"
      styles={{
        control: (base) => ({
          ...base,
          background: '#1A1A1A',
          border: '1px solid #333',
          borderRadius: '14px',
          minHeight: '56px',
          boxShadow: 'none'
        }),

        menu: (base) => ({
          ...base,
          background: '#1A1A1A',
          border: '1px solid #333'
        }),

        option: (base, state) => ({
          ...base,
          background: state.isFocused ? '#06b6d4' : '#1A1A1A',
          color: '#fff',
          cursor: 'pointer'
        }),

        multiValue: (base) => ({
          ...base,
          background: '#06b6d4'
        }),

        multiValueLabel: (base) => ({
          ...base,
          color: '#fff',
          fontWeight: 600
        }),

        multiValueRemove: (base) => ({
          ...base,
          color: '#fff',
          ':hover': {
            background: '#ef4444',
            color: '#fff'
          }
        }),

        singleValue: (base) => ({
          ...base,
          color: '#fff'
        }),

        input: (base) => ({
          ...base,
          color: '#fff'
        }),

        placeholder: (base) => ({
          ...base,
          color: '#777'
        })
      }}
    />
  )
}