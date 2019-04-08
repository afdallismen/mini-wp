$(document).ready(function () {
  $('#article-create').hide()
  $('#article-menu').hide()
  $('a.menu-link').click(function () {
    $(this).parent().get(0).classList.toggle('border-bottom')
    $(this).find('i').get(0).classList.toggle('fa-angle-down')
    $(this).find('i').get(0).classList.toggle('fa-angle-right')
    $(`#${$(this).attr('data-target')}`).toggle()
  })
  $('.menu-list').find('a').each(function () {
    $(this).click(function () {
      $('.menu-list').find('a').removeClass('is-active')
      $(this).get(0).classList.add('is-active')
      $(`#${$(this).attr('data-target')}`).siblings().hide()
      $(`#${$(this).attr('data-target')}`).show()
    })
  })

  ClassicEditor
    .create(document.querySelector('#editor'), {
      heading: {
        options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: { name: 'p', classes: 'is-size-1' }, title: 'Heading 1', class: 'ck-heading_heading1' },
          { model: 'heading2', view: { name: 'p', classes: 'is-size-2' }, title: 'Heading 2', class: 'ck-heading_heading2' },
          { model: 'heading3', view: { name: 'p', classes: 'is-size-3' }, title: 'Heading 3', class: 'ck-heading_heading3' },
          { model: 'heading4', view: { name: 'p', classes: 'is-size-4' }, title: 'Heading 4', class: 'ck-heading_heading4' },
          { model: 'heading5', view: { name: 'p', classes: 'is-size-5' }, title: 'Heading 5', class: 'ck-heading_heading5' },
          { model: 'heading6', view: { name: 'p', classes: 'is-size-6' }, title: 'Heading 6', class: 'ck-heading_heading6' },
          { model: 'heading7', view: { name: 'p', classes: 'is-size-7' }, title: 'Heading 7', class: 'ck-heading_heading7' }
        ]
      }
    })
    .catch(error => {
      console.error(error)
    })
})