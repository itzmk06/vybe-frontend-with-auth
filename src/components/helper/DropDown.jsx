function DropDown({ title, options, func }) {
  return (
    <div className="hidden sm:block">
      <div className="select text-xl text-zinc-400 w-[12vw] h-[5vh] text-center">
        <select defaultValue="0" name="format" id="format" className='mb-1 text-' onChange={func}>
          <option value="0" disabled>
            {title}
          </option>
          {options.map((o, i) => (
            <option key={i} value={o.toLowerCase()}>
              {o.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default DropDown;
