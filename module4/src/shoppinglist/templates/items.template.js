<a ui-sref="home">Home</a> &lt; <a ui-sref="categories">Categories</a> &lt; 

<span>Items</span>
<h3>Items</h3>
<table>
 
  <tr>
    <th>ShortName</th>
    <th>Name</th> 
    <th>Description</th>
  </tr>
  
  <tr ng-repeat="item in itemsCtrl.items">
    <td> {{ item.short_name }}  </td>
    <td> {{ item.name }}  </td>
    <td> {{item.description}} </td>
       
  </tr>

</table>