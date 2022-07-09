const content = `
    <div class="controls">
        <div class="form create-form">
            <input type="text" class="create-name">
            <input type="color" class="create-color" value="#d1c7c7">
            <button class="create">Create</button>
        </div>
        <div class="form update-form">
            <input type="text" class="update-name" disabled>
            <input type="color" class="update-color" value="#d1c7c7" disabled>
            <button class="update" disabled>Update</button>
        </div>
        <div class="cars-actions">
            <button class="race">Race</button>
            <button class="reset">Reset</button>
            <button class="generate">Generate cars</button>
        </div>
    </div>

    <div class="garage">
        <h2 class="garage-header">Garage (<span class="cars-amount"></span>)</h2>
        <h3 class="garage-page">Page #<span class="garage-page-num"></span></h3>

        <div class="cars">

        </div>
    </div>
    <div class="pagination">
        <button class="prev-cars-page" data-id="prev">Prev</button>
        <button class="next-cars-page" data-id="next">Next</button>
    </div>
`;

export default content;
