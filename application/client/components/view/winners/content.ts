const content = `
    <div class="headers">
        <h2 class="winners-header">Winners (<span class="winners-amount"></span>)</h2>
        <h3 class="winners-page">Page #<span class="winners-page-num"></span></h3>
    </div>

    <table class="winners-table">
        <thead class="winners-table-header">
            <tr class="winners-header-raw">
                <th>Number</th>
                <th>Car</th>
                <th>Name</th>
                <th>Wins</th>
                <th>Best time, seconds</th>
            </tr>
        </thead>
        <tbody class="winners-body">

        </tbody>
    </table>

    <div class="pagination">
        <button class="prev-winners-page" data-id="prev">Prev</button>
        <button class="next-winners-page" data-id="next">Next</button>
    </div>
`;

export default content;
